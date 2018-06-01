import React from "react";
import OnBoarding from "./OnBoarding";
import { AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import {
  loadSubscription,
  loadProducts,
  loadConsents,
  getProfile,
  setAuthentication
} from "../../actions";
import { auth0 } from '../../helper/auth';
import screens from "../../helper/screens";
import {logLoginEvent} from '../../helper/analytics';

class OnBoardingContainer extends React.Component {

  _signIn = async () => {
    console.log('signIn');
    const token = await AsyncStorage.getItem('@app:session');
    let authOptions = {
      scope: 'openid profile email offline_access',
      audience: 'http://google_api',
      connection: 'google-oauth2',
      response_type: 'token'
    };
    if (!token) {
      authOptions.prompt = 'login';
    }
    await auth0
      .webAuth
      .authorize(authOptions)
      .then(credentials => {
        console.log("credentials", credentials);
        return auth0
          .auth
          .userInfo({ token: credentials.accessToken })
          .then(userinfo => {
            const auth = {
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
              email: userinfo.email,
              name: userinfo.name,
              expiresAt: Date.now() + (30*1000)
              // expiresAt: Date.now()+ (credentials.expiresIn*1000)
            };
            this.props.setAuthentication(auth);
            logLoginEvent();
            AsyncStorage.setItem('@app:email', auth.email);
            AsyncStorage.setItem('@app:session-refresh', credentials.refreshToken);
            return AsyncStorage.setItem('@app:session', credentials.accessToken)
              .then(() => {

                console.log("Load subscription & products");
                this.props.getProfile();
                this.props.loadSubscription();
                this.props.loadProducts();
                this.props.loadConsents();
              });
          });
      })
      .catch(error => console.log(error));
  };

  _showTermsAndConditions = async () => {
    this.props.navigation.navigate(screens.TermsAndConditions);
  };

  checkForAutoLogin = async () => {
    console.log('checkForAutoLogin');
    if (this.props.auth) {
      console.log('We have logged in already, do startup');
      this.props.getProfile();
      this.props.loadSubscription();
      this.props.loadProducts();
      this.props.loadConsents();
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth && prevProps.auth === null) {
      this.checkForAutoLogin();
    } else if (this.props.profile.queried === true && prevProps.profile.queried === false) {
      // We have finished the getProfile query.
      // if the profile is missing we go to Signup.
      if (!this.props.profile.data) {
        this.props.navigation.navigate(screens.SignUp);
      } else {
        // Otherwise go to home page
        this.props.navigation.navigate(screens.Home);
      }
    }
  }

  render() {
    return (
      <OnBoarding signIn={this._signIn} showTermsAndConditions={this._showTermsAndConditions} />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, profile, auth } = state;
  return {
    error,
    profile,
    auth
  };
};

export default connect(mapStateToProps, {
  setAuthentication,
  loadSubscription,
  loadProducts,
  loadConsents,
  getProfile
})(OnBoardingContainer);

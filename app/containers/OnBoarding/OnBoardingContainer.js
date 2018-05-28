import React from "react";
import OnBoarding from "./OnBoarding";
import { AsyncStorage } from "react-native";
import Auth0 from 'react-native-auth0';
import { connect } from 'react-redux';
import {
  loadSubscription,
  loadProducts,
  loadConsents,
  getProfile,
  setAuthentication
 } from "../../actions";

// TODO: Move to configuration file or variables.js
const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';

// TODO: Move to utils file
const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: auth0ClientId });


class OnBoardingContainer extends React.Component {

  _signIn = async () => {
    console.log('signIn');
    await auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: 'http://google_api', connection: 'google-oauth2', response_type: 'token'})
      .then(credentials => {
        console.log("credentials", credentials);
        return auth0
          .auth
          .userInfo({token: credentials.accessToken})
          .then(userinfo => {
            const auth = {
              accessToken: credentials.accessToken,
              email: userinfo.email,
              name: userinfo.name
            };
            this.props.setAuthentication(auth)
            AsyncStorage.setItem('@app:email', auth.email)
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
    this.props.navigation.navigate('TermsAndConditions');
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.profile.queried === true && prevProps.profile.queried === false) {
      // We have finished the getProfile query.
      // if the profile is missing we go to Signup.
      if (!this.props.profile.data) {
        this.props.navigation.navigate('Signup');
      } else {
        // Otherwise go to home page
        this.props.navigation.navigate('App');
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
  const { error, profile } = state;
  return {
    error,
    profile
  };
};

export default connect(mapStateToProps, {
  setAuthentication,
  loadSubscription,
  loadProducts,
  loadConsents,
  getProfile
})(OnBoardingContainer);

import React from "react";
import OnBoarding from "./OnBoarding";
import { connect } from 'react-redux';
import { login } from '../../helper/auth';
import screens from "../../helper/screens";
import {logLoginEvent} from '../../helper/analytics';
import { storeFcmToken } from '../../helper/firebaseCloudMessaging';

class OnBoardingContainer extends React.Component {

  _signIn = async () => {
    const loginStatus = await login();
    if (loginStatus ===  true) {
      console.log("Load subscription & products");
      logLoginEvent();
      storeFcmToken();
    } else {
      console.log("Login failed.");
    }
  }

  _showTermsAndConditions = async () => {
    this.props.navigation.navigate(screens.TermsAndConditions);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.profile.queried === true && prevProps.profile.queried === false) {
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

export default connect(mapStateToProps)(OnBoardingContainer);

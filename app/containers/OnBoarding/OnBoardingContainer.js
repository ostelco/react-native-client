import React from "react";
import OnBoarding from "./OnBoarding";
import { login } from '../../helper/auth';
import screens from "../../helper/screens";
import {logLoginEvent} from '../../helper/analytics';
import { storeFcmToken } from '../../helper/firebaseCloudMessaging';
import { compose, lifecycle, withProps } from 'recompose';
import { withProfileFromState } from '../../helper/enhancers';
import {withNavigation} from "react-navigation";

export default compose(
  withProfileFromState,
  withNavigation,
  lifecycle({
    componentDidUpdate(prevProps, prevState, snapshot) {
      const forceSignUp = this.props.navigation.getParam('forceSignUp', false);
      if (this.props.profile.queried === true && prevProps.profile.queried === false) {
        // We have finished the getProfile query.
        // if the profile is missing we go to Signup.

        if (forceSignUp || !(this.props.profile && this.props.profile.data)) {
          this.props.navigation.navigate(screens.SignUp);
        } else {
          // Otherwise go to home page
          this.props.navigation.navigate(screens.Home);
        }
      }
    }
  }),
  withProps(({ navigation }) => ({
    signIn: async () => {
      const loginStatus = await login();
      if (loginStatus ===  true) {
        console.debug("Load subscription & products");
        logLoginEvent();
        storeFcmToken();
      } else {
        console.debug("Login failed.");
      }
    },
    showTermsAndConditions: () => {
      navigation.navigate(screens.TermsAndConditions);
    },
    onBoardingDescriptionLabel: 'We believe that staying connected should be easy and affordable.',
    loginButtonLabel: 'Sign in with Google',
    loginButtonIconName: 'logo-google',
    termsAndConditionsLabel: 'By using this app you agree to the terms & conditions',
    title: 'Red Otter',
  }))
)(OnBoarding);

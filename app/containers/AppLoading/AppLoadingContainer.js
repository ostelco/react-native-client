import AppLoading from "./AppLoading";
import { compose, lifecycle } from 'recompose';
import {withProfileFromState, withRefreshTokenFromState} from '../../helper/enhancers';
import screens from "../../helper/screens";
import { autoLogin } from '../../helper/auth';
import {logLoginEvent} from "../../helper/analytics";
import {storeFcmToken} from "../../helper/firebaseCloudMessaging";

export default compose(
  withRefreshTokenFromState,
  withProfileFromState,
  /**
   * If we have refresh token, redirect user to home if user profile is complete else redirect to sign up screen and prevent redirect to home after actual login verification
   * Then try login, if login fails and previous step redirected to Home, redirect to OnBoarding
   */
  lifecycle({
    async componentWillMount() {
      const { refreshToken, navigation, profile } = this.props;
      let redirectAfterLogin = false;
      if (refreshToken) {
        if (!profile.data) {
          redirectAfterLogin = true;
          navigation.navigate(screens.SignUp)
        } else {
          navigation.navigate(screens.Home);
        }
        const loginStatus = await autoLogin();
        if (loginStatus !== true) {
          if (redirectAfterLogin) {
            navigation.navigate(screens.OnBoarding);
          }
        } else {
          logLoginEvent();
          storeFcmToken();
        }
      } else {
        navigation.navigate(screens.OnBoarding);
      }
    }
  })
)(AppLoading);

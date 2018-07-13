import AppLoading from "./AppLoading";
import { compose, lifecycle } from 'recompose';
import { withRefreshTokenFromState } from '../../helper/enhancers';
import screens from "../../helper/screens";
import { autoLogin } from '../../helper/auth';
import {logLoginEvent} from "../../helper/analytics";
import {storeFcmToken} from "../../helper/firebaseCloudMessaging";

export default compose(
  withRefreshTokenFromState,
  /**
   * Without refreshToken: Navigate to OnBoarding
   * With refreshToken: Navigate to Home and login again, on success, trigger login event and get fcm token, on failure, navigate to OnBoarding
   */
  lifecycle({
    async componentWillMount() {
      const { refreshToken, navigation } = this.props;
      if (refreshToken) {
      navigation.navigate(screens.Home);
        const loginStatus = await autoLogin();
        if (loginStatus !== true) {
          navigation.navigate(screens.OnBoarding);
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

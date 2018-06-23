import PushNotification from "./PushNotification";
import {compose, lifecycle, withState, renderNothing, branch, withProps, mapProps} from 'recompose';
import firebase from 'react-native-firebase';
import { callApi } from '../../middleware/api';
import { AsyncStorage, Alert } from 'react-native';

const storeFCMToken = async (token) => {
  const applicationID = await firebase.iid().get();
  const tokenType = 'FCM';

  await callApi('applicationtoken', 'POST', JSON.stringify({ token, applicationID, tokenType }))
};

export default compose(
  withState('isFirstTimeOpenApp', 'setIsFirstTimeOpenApp', ""),
  lifecycle({
    async componentDidMount() {
      const isFirstTimeOpenApp = await AsyncStorage.getItem('@Panacea:isFirstTimeOpenApp') || "yes";
      console.log('isFirstTimeOpenApp:', isFirstTimeOpenApp);
      if (isFirstTimeOpenApp) {
        this.props.setIsFirstTimeOpenApp("yes");
      } else {
        this.props.setIsFirstTimeOpenApp("no");
      }
    }
  }),
  branch(({ isFirstTimeOpenApp }) => isFirstTimeOpenApp === "", renderNothing),
  withState('isLowDataWarningOn', 'setIsLowDataWarningOn', ""),
  lifecycle({
    async componentDidMount() {
      const isLowDataWarningOn = await AsyncStorage.getItem('@Panacea:isLowDataWarningOn') || "no";

      if (isLowDataWarningOn === "yes") {
        this.props.setIsLowDataWarningOn("yes");
      } else {
        this.props.setIsLowDataWarningOn("no");
      }
    }
  }),
  branch(({ isLowDataWarningOn }) => isLowDataWarningOn === "", renderNothing),
  lifecycle({
    async componentDidMount() {
      const { isFirstTimeOpenApp, isLowDataWarningOn } = this.props;

      if (isFirstTimeOpenApp === "no") {
        if (isLowDataWarningOn === "yes") {
          // TODO: check permission and ask for it if it is not on
          const enabled = await firebase.messaging().hasPermission();
          if (enabled) {
            // user has permissions
            console.log('[PushNotification] Has permissions');

            const fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
              // user has a device token
              console.log('[PushNotification] FCMToken:', fcmToken);
              storeFCMToken(fcmToken);

              this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                // Process your token as required
                console.log('[PushNotification] FCMToken refreshed:', fcmToken);
                storeFCMToken(fcmToken);
              });

            } else {
              // user doesn't have a device token yet
              console.log('[PushNotification] No FCMToken yet...');
            }

          } else {
            // user doesn't have permission
            console.log('[PushNotification] Missing permissions...')
            Alert.alert("Has no permissions...");
          }
        }
      }
    },
    componentWillUnmount() {
      if (this.onTokenRefreshListener) this.onTokenRefreshListener();
    }
  }),
  // Render dialog if first time open
  branch(({ isFirstTimeOpenApp }) => isFirstTimeOpenApp !== "yes", renderNothing),
  withState('isLoading', 'setIsLoading', false),
  withState('isVisible', 'setIsVisible', true),
  mapProps(({ isLowDataWarningOn, setIsLowDataWarningOn, setIsLoading, setIsVisible, isVisible }) => ({
    handleToggle: (checkboxValue) => {
      setIsLoading(true);
      const lowDataWarningOn = checkboxValue ? "no" : "yes";
      setIsLowDataWarningOn(lowDataWarningOn);
      AsyncStorage.setItem('@Panacea:isLowDataWarningOn', lowDataWarningOn)
        .catch(() => {
          setIsLowDataWarningOn(checkboxValue ? "yes" : "no");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    checkboxValue: isLowDataWarningOn === "yes",
    handleConfirm: () => {
      setIsVisible(false);
      console.log('mark isFirstTimeOpenApp:', 'no');
      AsyncStorage.setItem('@Panacea:isFirstTimeOpenApp', 'no');
    },
    isVisible,
  })),
)(PushNotification);

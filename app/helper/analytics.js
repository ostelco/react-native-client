import firebase from 'react-native-firebase'

const analytics = firebase.analytics();

export const setCurrentScreen = (screenName) => {
  analytics.setCurrentScreen(screenName);
}

export default {
  setCurrentScreen,
}
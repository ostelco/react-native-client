import firebase from 'react-native-firebase';

if (__DEV__) {
  firebase.config().enableDeveloperMode();
}

// Set default values
firebase.config().setDefaults({
  productSku: false
});

export const getRemoteConfig = (callback) => {

  // Parameter to fetch is how many seconds the config should be cached locally
  // In dev we disable cache to enable instant testing
  // In prod we can max fetch config 5 times per 60 minutes
  // Ref: https://firebase.google.com/docs/remote-config/android#caching_and_throttling
  firebase.config().fetch(__DEV__ ? 0 : 60 * 60 / 5)
    .then(() => {
      return firebase.config().activateFetched();
    })
    .then((activated) => {
      // console.log('Fetched data is activated');
      return firebase.config().getValue('productSku');
    })
    .then((snapshot) => {

      if (callback) {
        callback({ productSku: snapshot.val() });
      }

      const hasExperimentalFeature = snapshot.val();
      if(hasExperimentalFeature) {
        // console.log('experimental feature is enabled');
        //enableSuperCoolFeature();
      } else {
        // console.log('experimental feature is disabled');
      }

      // continue booting app
    })
    .catch(console.error);
};

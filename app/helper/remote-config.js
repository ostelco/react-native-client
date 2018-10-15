import firebase from 'react-native-firebase';

if (__DEV__) {
  firebase.config().enableDeveloperMode();
}

// Set default values
firebase.config().setDefaults({
  productSku: false,
  offerSKU: false,
  featureFlagEnableAddNewCreditCard: false,
  termsAndConditionsExternalLink: 'https://docs.google.com/document/d/1sO6M79QeAbf6IJT3X06nRC-fBCnvssEWuYliYw4lyMU/edit?usp=sharing'
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
    .then(() => {
      // console.log('Fetched data is activated');
      return firebase.config().getValues(['productSKU', 'offerSKU', 'featureFlagEnableAddNewCreditCard', 'termsAndConditionsExternalLink']);
    })
    .then((objects) => {

      let data = {};
      Object.keys(objects).forEach((key) => {
        data[key] = objects[key].val()
      });

      console.log('Fetched remote config values', data);

      if (callback) {
        callback(data);
      }

      // continue booting app
    })
    .catch(console.error);
};

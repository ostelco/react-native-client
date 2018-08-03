import firebase from 'react-native-firebase';
import { AsyncStorage } from "react-native";
import URI from 'urijs';

export const getReferralLink = async (uid) => {
  const link = new firebase.links.DynamicLink(`https://digital.telenor.panacea/invite?uid=${uid}`, 'wm3db.app.goo.gl');
  link.ios.setBundleId('digital.telenor.panacea');
  link.ios.setMinimumVersion('2.8.1');
  link.ios.setAppStoreId('1369918482');

  link.android.setPackageName('digital.telenor.panacea');
  // link.android.setMinimumVersion(14);

  return firebase.links().createShortDynamicLink(link, 'UNGUESSABLE')
};

export const initReferral = () => {
  firebase.links()
    .getInitialLink()
    .then((urlStr) => {
      if (urlStr) {
        const url = new URI(urlStr);

        // Handle invite urls
        if (url.path() === '/invite') {
          console.log('*************************************');
          console.log('app opened from url', url);

          // Fetch referrer from invite url
          if (url.hasQuery('uid') === true) {
            const uid = url.search(true)['uid']
            AsyncStorage.setItem('@app:invited-by', uid);
            alert(`invited by: ${uid}`)
          } else {
            // Invite url is missing referral id, silently ignore
          }
        } else {
          // Unknown deeplink, silently ignore
        }
      } else {
        // App not opened with deeplink
      }
    });

  // Listen for deeplinks while app is open
  const unsubscribe = firebase.links().onLink((urlStr) => {
    const url = new URI(urlStr);
    if (url.path() === '/invite') {
      console.log('*************************************');
      console.log('app opened from url while app is open', url);
      if (url.hasQuery('uid') === true) {
        const uid = url.search(true)['uid'];
        AsyncStorage.setItem('@app:invited-by', uid);
        alert(`invited by: ${uid}`);
      }
    }
  });
}


import firebase from 'react-native-firebase';
import { AsyncStorage } from "react-native";
import URI from 'urijs';

export const getReferralLink = async (uid, name) => {
  let shareLink = `https://digital.telenor.panacea/invite?uid=${encodeURI(uid)}`;

  if (name) {
    shareLink += `&name=${encodeURI(name)}`
  }

  const link = new firebase.links.DynamicLink(shareLink, 'wm3db.app.goo.gl');
  link.ios.setBundleId('digital.telenor.panacea');
  link.ios.setMinimumVersion('2.8.1');
  link.ios.setAppStoreId('1369918482');

  link.android.setPackageName('digital.telenor.panacea');

  link.social.setImageUrl('https://picsum.photos/300/200?image=0')
  link.social.setTitle('FREE DATA!!!');
  link.social.setDescriptionText('Join our service and get 1 GB free data on signup.');
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
            const uid = url.search(true)['uid'];
            const name = url.search(true)['name'];
            AsyncStorage.setItem('@app:invited-by', uid);
            alert(`${name ? `${name} has invited you to get free GBz.` : 'Opening app by invitation.\nYou are now one step closer to get free GBz' }`)
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
        const name = url.search(true)['name'];
        AsyncStorage.setItem('@app:invited-by', uid);
        alert(`${name ? `${name} has invited you to get free GBz.` : 'Opening app by invitation.\nYou are now one step closer to get free GBz' }`)
      }
    }
  });
}


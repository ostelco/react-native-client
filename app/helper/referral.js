import firebase from 'react-native-firebase';
import { AsyncStorage } from "react-native";
import URI from 'urijs';

export const getReferralLink = async (uid, name) => {

  console.log('1');
  let shareLink = `https://digital.telenor.panacea/invite?uid=${encodeURI(uid)}`;
  console.log('2');
  if (name) {
    shareLink += `&name=${encodeURI(name)}`
  }
  console.log('3');

  const link = new firebase.links.DynamicLink(shareLink, 'wm3db.app.goo.gl')
  .ios.setBundleId('digital.telenor.panacea')
  .ios.setMinimumVersion('2.8.1')
  .ios.setAppStoreId('1369918482')
  .android.setPackageName('digital.telenor.panacea')
  .social.setImageUrl('https://picsum.photos/400/300?image=0')
  .social.setTitle('FREE DATA!!!')
  .social.setDescriptionText('Join our service and get 1 GB free data on signup.');
  console.log('4');
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


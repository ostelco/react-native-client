import firebase from 'react-native-firebase';

import * as actions from "../actions";

let _store = null;
var _instanceID = null;
var _fcmToken = null;
var _tokenType = "FCM"

export function initFCM(store) {
    _store = store;
    getFirebaseInstanceID();
    getFcmToken();
}

async function getFcmToken() {
    _fcmToken = await firebase.messaging().getToken();
    if (_fcmToken) {
        console.log('Fetched FCM token : ', _fcmToken)
    } else {
        console.log('Could not get FCM token')
    }

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmToken) => {
        _fcmToken = fcmToken
        storeFcmToken();
    });
}

async function getFirebaseInstanceID() {
    _instanceID = await firebase.iid().get();
    if (_instanceID) {
        console.log('FirebaseInstanceID ', _instanceID)
    } else {
        console.log('I did not get a FirebaseInstanceID')
    }
}

export function storeFcmToken() {
    const token = {token : _fcmToken, applicationID : _instanceID, tokenType : _tokenType};
    console.log('storeFcmToken  token : ', token)
    _store.dispatch(actions.storeApplicationToken(token))
}

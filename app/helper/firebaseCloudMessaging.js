import firebase from 'react-native-firebase';

import * as actions from "../actions";

let _store = null;
var _instanceID = null;
var _fcmToken = null;
var _tokenType = "FCM"

export function initFCM(store) {
    _store = store;
    getFirebaseInstanceID();
    checkPermissions();
    getFcmToken();
}

async function checkPermissions() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        console.log('User has permissions')
    } else {
        console.log('User does not have permission')
    }
}

async function requestPermissions() {
    try {
        await firebase.messaging().requestPermission();
        console.log('User has authorised')
    } catch (error) {
        console.log('User has rejected permissions')
    }
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

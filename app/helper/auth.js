// TODO: Move to configuration file or variables.js
import Auth0 from "react-native-auth0";
import { AsyncStorage } from "react-native";
import NavigationService from '../../NavigationService';
import screens from "./screens";
import { setAuthentication, userLogout } from "../actions";

const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';

// TODO: Move to utils file
export const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: auth0ClientId });

let _store = null;
export function setStore(store) {
  _store = store;
}

function setAuthParams(credentials, userInfo) {
  const auth = {
    accessToken: credentials.accessToken,
    refreshToken: credentials.refreshToken,
    email: userinfo.email,
    name: userinfo.name,
    expiresAt: Date.now()+ (credentials.expiresIn*1000)
  };
  _store.dispatch(setAuthentication(auth));
  AsyncStorage.setItem('@app:email', auth.email);
  AsyncStorage.setItem('@app:session-refresh', credentials.refreshToken);
  AsyncStorage.setItem('@app:session', credentials.accessToken);
}

export async function login() {
  console.log('login');
  const token = await AsyncStorage.getItem('@app:session');
  let authOptions = {
    scope: 'openid profile email offline_access',
    audience: 'http://google_api',
    connection: 'google-oauth2',
    response_type: 'token'
  };
  if (!token) {
    authOptions.prompt = 'login';
  }
  const loginStatus = await auth0
    .webAuth
    .authorize(authOptions)
    .then(credentials => {
      console.log("credentials", credentials);
      return auth0
        .auth
        .userInfo({ token: credentials.accessToken })
        .then(userinfo => {
          setAuthParams(credentials, userinfo);
          return true;
        });
    })
    .catch(error => {
      console.log(error);
      return false;
    });
    return loginStatus;
}

export async function autoLogin() {
  console.log('autoLogin');
  const refreshToken = await AsyncStorage.getItem('@app:session-refresh');
  let authOptions = {
    scope: 'openid profile email',
    refreshToken
  };
  if (!refreshToken) {
    console.log("No refresh Token, go to login");
    return false;
  }
  const loginStatus = await auth0
    .auth
    .refreshToken(authOptions)
    .then(credentials => {
      console.log("Refreshed credentials", credentials);
      return auth0
        .auth
        .userInfo({ token: credentials.accessToken })
        .then(userinfo => {
          setAuthParams(credentials, userinfo);
          return true;
        });
    })
    .catch(error => {
      console.log(error);
      cleanup();
      return false;
    });
    return loginStatus;
}

function cleanup() {
  NavigationService.navigate(screens.OnBoarding);
  _store.dispatch(userLogout());
  AsyncStorage.removeItem('@app:email');
  AsyncStorage.removeItem('@app:session-refresh');
  AsyncStorage.removeItem('@app:session');
}

export async function getAuthHeader() {
  const state = _store.getState();
  const expiresAt = _.get(state, "auth.expiresAt", null);
  if (Date.now() >= expiresAt) {
    // Re login
    console.log("Auth token expired, relogin");
    const status = await autoLogin(true);
    if (status == false) {
      // relogin failed.
      console.log("Re-login failed");
      return null;
    }
  }
  const value = _.get(state, "auth.accessToken", null);
  if (value !== null) {
    return `Bearer ${value}`;
  } else {
    return null;
  }
}


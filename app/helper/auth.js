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

export async function autoLogin(fail) {
  console.log('autoLogin');
  const refreshToken = await AsyncStorage.getItem('@app:session-refresh');
  let authOptions = {
    scope: 'openid profile email',
    refreshToken
  };
  if (fail) {
    cleanup();
    return Promise.reject(false);
  }
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
          const auth = {
            accessToken: credentials.accessToken,
            refreshToken,
            email: userinfo.email,
            name: userinfo.name,
            //expiresAt: Date.now()+ (credentails.expiresIn*1000)
            expiresAt: Date.now() + (30*1000)
          };
          store.dispatch(setAuthentication(auth));
          AsyncStorage.setItem('@app:email', auth.email);
          AsyncStorage.setItem('@app:session', credentials.accessToken);
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


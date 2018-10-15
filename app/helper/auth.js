// TODO: Move to configuration file or variables.js
import Auth0 from "react-native-auth0";
import * as _ from "lodash";
import NavigationService from '../../NavigationService';
import screens from "./screens";
import * as actions from "../actions";
import {callApi} from "../middleware/api";

const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';

// TODO: Move to utils file
export const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: auth0ClientId });

let _store = null;

export function setStore(store) {
  _store = store;
}

function loadStateFromServer(credentials, userInfo, refreshToken) {

  actions.loadBundles()(_store.dispatch, _store.getState);
  actions.loadPurchaseHistory()(_store.dispatch, _store.getState);
  actions.loadSubscription()(_store.dispatch, _store.getState);
  actions.loadPseudonyms()(_store.dispatch, _store.getState);
  actions.loadProducts()(_store.dispatch, _store.getState);
  actions.loadConsents()(_store.dispatch, _store.getState);
}

function cleanup() {
  NavigationService.navigate(screens.OnBoarding);
  _store.dispatch(actions.userLogout());
}

export async function login(shouldLoadStateFromServer=true, raiseException=false) {
  console.log('login');
  let authOptions = {
    scope: 'openid profile email offline_access',
    audience: 'http://google_api',
    connection: 'google-oauth2',
    response_type: 'token',
    prompt: 'login'
  };
  const loginStatus = await auth0
    .webAuth
    .authorize(authOptions)
    .then(credentials => {
      console.log("credentials", credentials);
      return auth0
        .auth
        .userInfo({ token: credentials.accessToken })
        .then(userinfo => {
          const auth = {
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            email: userinfo.email,
            name: userinfo.name,
            expiresAt: Date.now()+ (credentials.expiresIn*1000)
          };
          _store.dispatch(actions.setAuthentication(auth));
          _store.dispatch(actions.userLoggedIn());
          return callApi('profile', 'GET')
            .then(response => {
              console.log('Call API', 'profile', 'success', response, _store)
              _store.dispatch({
                response,
                type: actions.PROFILE_SUCCESS,
                data: {
                  type: actions.PROFILE_SUCCESS,
                  data: {},
                  response
                }
              });
              if (shouldLoadStateFromServer) {
                loadStateFromServer(credentials, userinfo, credentials.refreshToken);
              }
              return true
            })
            .catch(error => {
              console.log('Call API', 'profile', 'error', error);
              _store.dispatch(() => ({
                type: actions.PROFILE_FAILURE,
                error: error.message | 'Something bad happened',
                data: {
                  type: actions.PROFILE_FAILURE,
                  error: error.message | 'Something bad happened',
                  data: {}
                }
              }));
              if (raiseException) throw error;
              return false;
            })
        });
    })
    .catch(error => {
      console.log(error);
      if (raiseException) throw error;
      return false;
    });
    return loginStatus;
}


export async function autoLogin(shouldLoadStateFromServer=true) {
  console.log('autoLogin', _store.getState());
  const { auth, profile } = _store.getState();
  const refreshToken = _.get(auth, 'refreshToken');
  let authOptions = {
    scope: 'openid profile email',
    refreshToken
  };
  if (!refreshToken) {
    console.log("No refresh Token, go to login");
    return {
      failed: true,
      missingRefreshToken: true
    };
  }

  // Prevents autologin to complete after auth0 login when app enters active state
  if (!profile.data) {
    return {
      failed: true,
      missingProfile: true
    }
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
          if (shouldLoadStateFromServer) {
            loadStateFromServer(credentials, userinfo, refreshToken);
          }
          return {
            failed: false
          };
        });
    })
    .catch(error => {
      console.log(error);
      cleanup();
      return {
        failed: true,
        failedToRefreshToken: true
      }
    });
    return loginStatus;
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
      _store.dispatch(actions.userLogout());
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

export function getCurrentPseudonym() {
  const { pseudonyms } = _store.getState();
  let pseudonym = null;
  if (pseudonyms && pseudonyms.current && pseudonyms.next) {
    const now = Date.now();
    if (pseudonyms.current.start <= now && now <= pseudonyms.current.end) {
      pseudonym = pseudonyms.current.pseudonym;
    } else {
      if (pseudonyms.next.start <= now && now <= pseudonyms.next.end) {
        pseudonym = pseudonyms.next.pseudonym;
      }
      // We crossed the time period, refresh pseudonyms
      actions.loadPseudonyms()(_store.dispatch, _store.getState);
    }
  }
  return pseudonym;
}

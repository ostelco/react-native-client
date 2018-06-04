// TODO: Move to configuration file or variables.js
import Auth0 from "react-native-auth0";
import { AsyncStorage } from "react-native";

import {
  loadSubscription,
  loadProducts,
  loadConsents,
  getProfile,
  setAuthentication
} from "../actions";

const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';

// TODO: Move to utils file
export const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: auth0ClientId });

export async function autoLogin(store) {
  console.log('autoLogin');
  const refreshToken = await AsyncStorage.getItem('@app:session-refresh');
  let authOptions = {
    scope: 'openid profile email',
    refreshToken
  };
  if (!refreshToken) {
    console.log("No refresh Token, go to login");
    return;
  }
  await auth0
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
            name: userinfo.name
          };
          store.dispatch(setAuthentication(auth));
          AsyncStorage.setItem('@app:email', auth.email);
          AsyncStorage.setItem('@app:session', credentials.accessToken);
        });
    })
    .catch(error => console.log(error));
}

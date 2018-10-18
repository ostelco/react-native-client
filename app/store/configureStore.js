import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import api from '../middleware/api'
import rootReducer from '../reducers'
import {autoLogin} from "../helper/auth";
import NavigationService from "../../NavigationService";
import screens from "../helper/screens";
import SplashScreen from "react-native-splash-screen";
import {loadBundles, loadProducts} from "../actions";

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['pseudonyms', 'auth', 'profile', 'products', 'subscription', 'cards', 'bundles']
};

let interval;
let store;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setBundlesTimer = () => {
  console.log('set bundles timer...');
  if (typeof interval === 'undefined' || interval === 0) {
    interval = setInterval(() => reloadBundles(), 5000);
  }
}

export const reloadBundles = () => {
  store.dispatch(loadBundles());
  store.dispatch(loadProducts());
}

export default () => {
  store = createStore(persistedReducer, applyMiddleware(thunk, api));
  let persistor = persistStore(store, {}, async () => {
    console.log('------------------------------');
    console.log('persist done...');


    const loginStatus = await autoLogin();

    console.log('autologin', loginStatus);
    if (!loginStatus.failed) {
      console.log('User logged in, hide splash screen and redirect to home.')
      console.log('Hide splash screen...');
      SplashScreen.hide();
      NavigationService.navigate(screens.Home);
      setBundlesTimer()
    } else {
      if (!loginStatus.missingProfile) {
        console.log('User not logged in, hide splash screen and redirect to login');
        // store.dispatch(actions.userLogout());
        NavigationService.navigate(screens.OnBoarding);
        console.log('Hide splash screen...');
        SplashScreen.hide();
      }
      console.log('Hide Splash screen');
      SplashScreen.hide();
    }
  });
  return { store, persistor }
}

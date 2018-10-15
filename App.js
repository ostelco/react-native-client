import React from 'react';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore'
import {autoLogin, setStore} from './app/helper/auth'
import NavigationService from './NavigationService';
import { getRemoteConfig } from './app/helper/remote-config';
import { AppState } from 'react-native';
import {setRemoteConfig, loadBundles, loadProducts} from './app/actions';
import { PersistGate } from 'redux-persist/integration/react'
import analytics from "./app/helper/analytics";
import { initInstabug } from "./app/helper/instabug";
import { initFCM } from './app/helper/firebaseCloudMessaging';
import { RootStack } from './app/config/routes';
import { initReferral } from "./app/helper/referral";
import SplashScreen from "react-native-splash-screen";
import * as actions from "./app/actions";
import screens from "./app/helper/screens";

const { store, persistor } = configureStore();
setStore(store); // For auth related properties
initFCM(store);
initReferral();

// Fetch remote config on startup
const _getRemoteConfigCallback = data => store.dispatch(setRemoteConfig(data));
getRemoteConfig(_getRemoteConfigCallback);

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState };
  }

  async componentWillMount() {
    initInstabug();
    // TODO: Hardcoded value until better approach is implemented since onNavigationStateChange does not capture initial screen view
    analytics.setCurrentScreen('OnBoarding');
  }

  componentDidMount = async() => {
    this._setBundlesTimer();
    AppState.addEventListener('change', this._handleAppStateChange);
    // TODO: Check login here then hide splashscreen
    const loginStatus = await autoLogin();
    if (loginStatus) {
      console.log('User logged in, hide splash screen and redirect to home.')
      setTimeout((() => {
        NavigationService.navigate(screens.Home);
        console.log('Hide splash screen...')
        SplashScreen.hide();
      }), 200);
    } else {
      console.log('User not logged in, hide splash screen and redirect to login');
      store.dispatch(actions.userLogout());
      setTimeout((() => {
        NavigationService.navigate(screens.Home);
        console.log('Hide splash screen...')
        SplashScreen.hide();
      }), 200);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async (nextAppState) => {
    // Get remote config when app enters foreground
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      getRemoteConfig(_getRemoteConfigCallback);
      this._setBundlesTimer();
      SplashScreen.show();
      const loginStatus = await autoLogin();
      if (loginStatus) {
        NavigationService.navigate(screens.Home);
      } else {
        store.dispatch(actions.userLogout());
        NavigationService.navigate(screens.OnBoarding);
      }
      SplashScreen.hide();
    }
    this.setState({appState: nextAppState});
  };

  _reloadBundles() {
    store.dispatch(loadBundles());
    store.dispatch(loadProducts());
  }

  _setBundlesTimer() {
    if (typeof this.interval === 'undefined' || this.interval === 0) {
      this.interval = setInterval(() => this._reloadBundles() , 5000);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <Root>
            <RootStack
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
              onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getActiveRouteName(currentState);
                const prevScreen = getActiveRouteName(prevState);
                if (prevScreen !== currentScreen) {
                  // the line below uses the Google Analytics tracker
                  // change the tracker here to use other Mobile analytics SDK.
                  analytics.setCurrentScreen(currentScreen)
                }
              }}
            />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

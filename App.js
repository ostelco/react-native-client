import React from 'react';
import {createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Root, Text} from "native-base";
import { OnBoardingContainer, SignupContainer, TermsAndConditionsContainer, GDPRContainer, HomeContainer, PaymentContainer, PurchaseHistoryContainer, UserDetailsContainer, PrivacyPolicyContainer, DeleteAccountContainer, SettingsContainer, PrivacyContainer, UserDetailsEditContainer } from "./app/containers";
import { RNConfetti } from "./app/components";
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore'
import { setStore, autoLogin } from './app/helper/auth'
import NavigationService from './NavigationService';
import { getRemoteConfig } from './app/helper/remote-config';
import { AppState } from 'react-native';
import { setRemoteConfig } from './app/actions';
import { PersistGate } from 'redux-persist/integration/react'
import analytics from "./app/helper/analytics";

const { store, persistor } = configureStore();
setStore(store); // For auth related properties

// Fetch remote config on startup
const _getRemoteConfigCallback = data => store.dispatch(setRemoteConfig(data));
getRemoteConfig(_getRemoteConfigCallback);

const AppStack = createStackNavigator({
  Home: HomeContainer,
  PaymentStack: createSwitchNavigator({
    Payment: PaymentContainer,
    PaymentComplete: RNConfetti
  }, {
      initialRouteName: 'Payment',
      headerMode: 'none'
  }),
  MenuStack: createStackNavigator({
      Settings: SettingsContainer,
      UserDetailsStack: createStackNavigator({
        UserDetails: UserDetailsContainer,
        UserDetailsEdit: UserDetailsEditContainer
      }, {
        initialRouteName: 'UserDetails',
        headerMode: 'none',
        mode: 'modal'
      }),
      PrivacyStack: createStackNavigator({
          Privacy: PrivacyContainer,
          PrivacyPolicy: PrivacyPolicyContainer,
          TermsAndConditions: TermsAndConditionsContainer
        }, {
          initialRouteName: 'Privacy',
          headerMode: 'none'
      }),
      PurchaseHistory: PurchaseHistoryContainer,
      DeleteAccount: DeleteAccountContainer,
    }, {
      initialRouteName: 'Settings',
      headerMode: 'none'
    }),
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});

const RootStack = createSwitchNavigator({
  OnBoardingStack: createStackNavigator({
    OnBoarding: OnBoardingContainer,
    TermsAndConditions: TermsAndConditionsContainer,
    SignUp: SignupContainer
  }, {
    initialRouteName: 'OnBoarding',
    headerMode: 'none'
  }),
  GDPR: GDPRContainer,
  AppStack: AppStack
}, {
  initialRouteName: 'OnBoardingStack'
});

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

const AppLoading = () => (
  <Text>Loading...</Text>
);

// Callback after redux store is loaded from persistant store
const onBeforeLift = () => {
  autoLogin(); // Try automatic login
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, appState: AppState.currentState };
  }

  async componentWillMount() {
    this.setState({ loading: false });
    // TODO: Hardcoded value until better approach is implemented since onNavigationStateChange does not capture initial screen view
    analytics.setCurrentScreen('OnBoarding');
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    // Get remote config when app enters foreground
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      getRemoteConfig(_getRemoteConfigCallback);
    }
    this.setState({appState: nextAppState});
  }

  render() {
    if (this.state.loading) {
      return (
        <Provider store={store}>
          <Root>
            <AppLoading />
          </Root>
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
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
                  console.log('Current:', currentScreen, currentState);
                  console.log('Prev:', prevScreen, prevState);
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

// export default /*__DEV__*/ true ? StorybookUI : App;

import React from 'react';
import {createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Root, Text} from "native-base";
import { OnBoardingContainer, SignupContainer, TermsAndConditionsContainer, GDPRContainer, HomeContainer, PaymentContainer, PurchaseHistoryContainer, UserDetailsContainer, PrivacyPolicyContainer, DeleteAccountContainer, SettingsContainer, PrivacyContainer } from "./app/containers";
import { RNConfetti } from "./app/components";
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore'

const store = configureStore()

const AppStack = createStackNavigator({
  Home: {
    screen: HomeContainer
  },
  Payment: {
    screen: createSwitchNavigator({
      PaymentForm: PaymentContainer,
      PaymentComplete: RNConfetti
    }, {
      initialRouteName: 'PaymentForm',
      headerMode: 'none'
    })
  },
  Menu: {
    screen: createStackNavigator({
      Settings: {
        screen: SettingsContainer
      },
      UserDetails: {
        screen: UserDetailsContainer
      },
      Privacy: {
        screen: createStackNavigator({
          Home: {
            screen: PrivacyContainer
          },
          PrivacyPolicy: {
            screen: PrivacyPolicyContainer
          },
          TermsAndConditions: {
            screen: TermsAndConditionsContainer
          }
        }, {
          initialRouteName: 'Home',
          headerMode: 'none'
        })
      },
      PurchaseHistory: {
        screen: PurchaseHistoryContainer
      },
      DeleteAccount: {
        screen: DeleteAccountContainer,
      }
    }, {
      initialRouteName: 'Settings',
      headerMode: 'none'
    })
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});

const RootStack = createSwitchNavigator({
  OnBoarding: createStackNavigator({
    Home: {
      screen: OnBoardingContainer
    },
    TermsAndConditions: {
      screen: TermsAndConditionsContainer
    },
    Signup: {
      screen: SignupContainer
    }
  }, {
    initialRouteName: 'Home',
    headerMode: 'none'
  }),
  GDPR: GDPRContainer,
  App: {
    screen: AppStack
  }
}, {
  initialRouteName: 'OnBoarding'
});


const AppLoading = () => (
  <Text>Loading...</Text>
);


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    /*
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    */
    this.setState({ loading: false });
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
        <Root>
          <RootStack />
        </Root>
      </Provider>
    );
  }
}

// export default /*__DEV__*/ true ? StorybookUI : App;

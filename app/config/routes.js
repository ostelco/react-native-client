import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {
  AppLoadingContainer,
  DeleteAccountContainer, GDPRContainer, HomeContainer, OnBoardingContainer,
  PaymentContainer, PrivacyContainer, PrivacyPolicyContainer, PurchaseHistoryContainer, SettingsContainer,
  SignupContainer, TermsAndConditionsContainer,
  UserDetailsContainer, UserDetailsEditContainer
} from "../containers";
import {RNConfetti} from "../components";

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

export const RootStack = createSwitchNavigator({
  OnBoardingStack: createStackNavigator({
    OnBoarding: OnBoardingContainer,
    TermsAndConditions: TermsAndConditionsContainer,
    SignUp: SignupContainer
  }, {
    initialRouteName: 'OnBoarding',
    headerMode: 'none'
  }),
  GDPR: GDPRContainer,
  AppStack: AppStack,
  AppLoading: AppLoadingContainer,
}, {
  initialRouteName: 'AppLoading'
});
import {Platform, AsyncStorage} from 'react-native';
import Instabug from "instabug-reactnative";

export const initInstabug = async () => {
  Instabug.startWithToken('d50e4b80d80701c04553b97dbf6a318b', Instabug.invocationEvent.shake);
  Instabug.setColorTheme(Instabug.colorTheme.dark);
  Instabug.setExtendedBugReportMode(Instabug.extendedBugReportMode.enabledWithRequiredFields);
  Instabug.setIntroMessageEnabled(false);

  if (Platform.OS === 'ios') {
    Instabug.setUserStepsEnabled(true);
  }

  Instabug.isRunningLive(function (isLive) {
    if (isLive) {
      // Instabug.startWithToken('LIVE_TOKEN', Instabug.invocationEvent.none);
    } else {
      Instabug.startWithToken('d50e4b80d80701c04553b97dbf6a318b', Instabug.invocationEvent.shake);
    }
  });

  const hasShownWelcomeMessage = await AsyncStorage.getItem('@Panacea:hasShownInstabugWelcomeMessage');
  if (hasShownWelcomeMessage !== "yes") {
    showWelcomeMessage();
    AsyncStorage.setItem('@Panacea:hasShownInstabugWelcomeMessage', "yes");
  }


};

const showWelcomeMessage = () => {
  Instabug.isRunningLive(isLive => {
    if (isLive) {
      Instabug.showWelcomeMessage(Instabug.welcomeMessageMode.live);
    } else {
      Instabug.showWelcomeMessage(Instabug.welcomeMessageMode.beta);
    }
  })
}
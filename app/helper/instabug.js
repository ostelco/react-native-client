import {Platform, AsyncStorage} from 'react-native';
import Instabug from "instabug-reactnative";
import Config from 'react-native-config'

export const initInstabug = async () => {
  Instabug.setColorTheme(Instabug.colorTheme.dark);
  Instabug.setExtendedBugReportMode(Instabug.extendedBugReportMode.enabledWithRequiredFields);
  Instabug.setIntroMessageEnabled(false);

  if (Platform.OS === 'ios') {
    Instabug.setUserStepsEnabled(true);
  }

  Instabug.isRunningLive(function (isLive) {
    if (isLive) {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, Instabug.invocationEvent.none);
    } else {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, Instabug.invocationEvent.shake);
    }
  });
};

export const showWelcomeMessage = () => {
  Instabug.isRunningLive(isLive => {
    if (isLive) {
      Instabug.showWelcomeMessage(Instabug.welcomeMessageMode.live);
    } else {
      Instabug.showWelcomeMessage(Instabug.welcomeMessageMode.beta);
    }
  })
}

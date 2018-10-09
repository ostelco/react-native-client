import {Platform} from 'react-native';
import Instabug, { BugReporting } from "instabug-reactnative";
import Config from 'react-native-config'

export const initInstabug = async () => {
  Instabug.setColorTheme(Instabug.colorTheme.dark);
  BugReporting.setExtendedBugReportMode(BugReporting.extendedBugReportMode.enabledWithRequiredFields);
  Instabug.setIntroMessageEnabled(false);

  if (Platform.OS === 'ios') {
    Instabug.setUserStepsEnabled(true);
  }

  Instabug.isRunningLive(function (isLive) {
    if (isLive) {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, [BugReporting.invocationEvent.shake]);
    } else {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, [BugReporting.invocationEvent.none]);
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

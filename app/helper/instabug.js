import {Platform, AsyncStorage} from 'react-native';
import Instabug from "instabug-reactnative";
import Config from 'react-native-config'

let instabugInvocationEvent;

switch (Config.INSTABUG_INVOCATION_EVENT) {
  case "shake":
    instabugInvocationEvent = Instabug.invocationEvent.shake;
    break;
  case "none":
    instabugInvocationEvent = Instabug.invocationEvent.none;
    break;
  default:
    throw new Error(`Instabug invocation event not implemented: ${Config.INSTABUG_INVOCATION_EVENT}`);
}

export const initInstabug = async () => {
  Instabug.setColorTheme(Instabug.colorTheme.dark);
  Instabug.setExtendedBugReportMode(Instabug.extendedBugReportMode.enabledWithRequiredFields);
  Instabug.setIntroMessageEnabled(false);

  if (Platform.OS === 'ios') {
    Instabug.setUserStepsEnabled(true);
  }

  Instabug.isRunningLive(function (isLive) {
    if (isLive) {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, instabugInvocationEvent);
    } else {
      Instabug.startWithToken(Config.INSTABUG_TOKEN, instabugInvocationEvent);
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

import { connect } from 'react-redux';
import {compose, lifecycle, withState, branch, renderNothing} from "recompose";
import {showWelcomeMessage} from "./instabug";
import {AsyncStorage} from "react-native";

export const withProfileFromState = connect(({ profile }) => ({ profile }));
export const withRefreshTokenFromState = connect(({ auth }) => ({ refreshToken: auth && auth.refreshToken }));

export const withInstabugWelcomeMessage = compose(
  withState('hasShownWelcomeMessage', 'setHasShownWelcomeMessage', null),
  lifecycle({
    async componentDidMount () {
      const { setHasShownWelcomeMessage } = this.props;
      const hasShownWelcomeMessage = await AsyncStorage.getItem('@Panacea:hasShownInstabugWelcomeMessage') || "no";
      setHasShownWelcomeMessage(hasShownWelcomeMessage);
    }
  }),
  branch(({ hasShownWelcomeMessage }) => hasShownWelcomeMessage === null, renderNothing),
  lifecycle({
    componentDidMount() {
      const { hasShownWelcomeMessage } = this.props;
      console.debug('hasShownWelcomeMessage=', hasShownWelcomeMessage);
      if (hasShownWelcomeMessage !== "yes") {
        console.debug('show instabug welcome message.');
        showWelcomeMessage();
        AsyncStorage.setItem('@Panacea:hasShownInstabugWelcomeMessage', "yes");
      } else {
        console.debug('dont show instabug welcome message, already shown once.');
      }
    }
  })
);
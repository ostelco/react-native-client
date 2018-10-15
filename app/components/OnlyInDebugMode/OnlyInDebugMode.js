import {branch, compose, renderNothing} from "recompose";

const OnlyInDebugMode = ({ children }) => children;

export default compose(
  branch(() => !__DEV__, renderNothing)
)(OnlyInDebugMode);
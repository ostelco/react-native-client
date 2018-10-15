// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function _navigate(routeName,params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigate(routeName, params) {
  if (!_navigator) {
    setTimeout(() => navigate(routeName, params), 200)
  } else {
    _navigate(routeName, params);
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
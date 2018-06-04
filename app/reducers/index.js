import * as ActionTypes from '../actions'
import { combineReducers } from 'redux';
import firebase from "react-native-firebase";

const subscription = (state = { isFetching: false, status: null }, action) => {
  console.log("Action = ", action);
  const  { type, response } = action;
  switch(type) {
    case ActionTypes.SUBSCRIPTION_REQUEST:
      return {...state, isFetching: true};
    case ActionTypes.SUBSCRIPTION_FAILURE:
      return {isFetching: false, status:null};
    case ActionTypes.SUBSCRIPTION_SUCCESS:
      return {isFetching: false, status:response};
  }
  return state;
}

const products = (state = { isFetching: false, list: null }, action) => {
  const  { type, response } = action;
  switch(type) {
    case ActionTypes.PRODUCTS_REQUEST:
      return {...state, isFetching: true};
    case ActionTypes.PRODUCTS_FAILURE:
      return {isFetching: false, list:null};
    case ActionTypes.PRODUCTS_SUCCESS:
      return {isFetching: false, list:response};
  }
  return state;
}

function getPrivacyConsent(list) {
  if (list && Array.isArray(list)) {
    return list.find( consent => consent.consentId === 'privacy');
  }
  return null;
}

const consents = (state = { isFetching: false, list: null, privacy: null }, action) => {
  const  { type, response } = action;
  switch(type) {
    case ActionTypes.CONSENTS_REQUEST:
      return {...state, isFetching: true};
    case ActionTypes.CONSENTS_FAILURE:
      return {isFetching: false, list: null, privacy: null};
    case ActionTypes.CONSENTS_SUCCESS:
      return {isFetching: false, list: response, privacy: getPrivacyConsent(response)};
  }
  return state;
}

const profile = (state = { isFetching: false, data: null, queried: false }, action) => {
  const  { type, response } = action;
  switch(type) {
    case ActionTypes.PROFILE_REQUEST:
      return {...state, isFetching: true, queried: false};
    case ActionTypes.PROFILE_FAILURE:
       return {isFetching: false, data: null, queried: true};
    case ActionTypes.PROFILE_SUCCESS:
    case ActionTypes.PROFILE_CREATE_SUCCESS:
    case ActionTypes.PROFILE_UPDATE_SUCCESS:
       return {isFetching: false, data: response, queried: true};
  }
  return state;
}

const selectedProduct = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

const auth = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

// Updates error message to notify about the failed fetches.
const error = (state = null, action) => {
  const { type, error } = action;
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return { message: error, type };
  }
  return state;
}

const appReducer = combineReducers({
  auth,
  subscription,
  products,
  consents,
  profile,
  selectedProduct,
  error,
});

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.USER_LOGOUT) {
    state = undefined
  }

  console.log(action);

  switch (action.type) {
    case ActionTypes.SUBSCRIPTION_FAILURE:
      firebase.crashlytics().log(`User is missing a subscription.`);
      break;
    case ActionTypes.PROFILE_SUCCESS:
    case ActionTypes.PROFILE_CREATE_SUCCESS:
    case ActionTypes.PROFILE_UPDATE_SUCCESS:
      firebase.crashlytics().setUserIdentifier(action.response.email);
  }

  return appReducer(state, action);
};

export default rootReducer;

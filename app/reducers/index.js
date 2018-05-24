import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

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
  console.log("Action = ", action);
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

const selectedProduct = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_PRODUCT:
      return action.product;
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

const rootReducer = combineReducers({
  subscription,
  products,
  selectedProduct,
  error,
});

export default rootReducer;

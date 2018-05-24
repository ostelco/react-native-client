import { CALL_API, Schemas } from '../middleware/api'

export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST'
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS'
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE'

// Fetches the subscription status.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchSubscription = () => ({
  [CALL_API]: {
    types: [ SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE ],
    endpoint: 'subscription/status',
    method: 'GET'
  }
})

// Fetches the subscription unless it is cached.
// Relies on Redux Thunk middleware.
export const loadSubscription = () => (dispatch, getState) => {
  const subscription = getState().subscription
  console.log("loadSubscription -> subscription =", subscription);
  if (subscription) {
    const {status, isFetching } = subscription;
    if (status && !isFetching) {
      return null;
    }
  }
  console.log("loadSubscription -> fetchSubscription");
  return dispatch(fetchSubscription())
}

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST'
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS'
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE'

// Fetches the list of products for this user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchProducts = () => ({
  [CALL_API]: {
    types: [ PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE ],
    endpoint: 'products',
    method: 'GET'
  }
})

// Fetches the subscription unless it is cached.
// Relies on Redux Thunk middleware.
export const loadProducts = () => (dispatch, getState) => {
  const products = getState().products
  console.log("loadProducts -> products =", products);
  if (products) {
    const { list, isFetching } = products;
    if (list && !isFetching) {
      return null;
    }
  }
  console.log("loadProducts -> fetchProducts");
  return dispatch(fetchProducts())
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

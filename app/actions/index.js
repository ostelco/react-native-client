import { CALL_API, Schemas } from '../middleware/api';

export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST';
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE';

const fetchSubscription = () => ({
  [CALL_API]: {
    types: [ SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE ],
    endpoint: 'subscription/status',
    method: 'GET'
  }
});

export const loadSubscription = () => (dispatch, getState) => {
  const subscription = getState().subscription;
  if (subscription && subscription.isFetching) {
    // We are curently fetching the subscription,
    // wait before sending a new request
    console.log("In the middle of fetching subscription")
    return null;
  }
  console.log("Fetching subscription")
  return dispatch(fetchSubscription());
}

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';

const fetchProducts = () => ({
  [CALL_API]: {
    types: [ PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE ],
    endpoint: 'products',
    method: 'GET'
  }
});

export const loadProducts = () => (dispatch, getState) => {
  const products = getState().products;
  if (products && products.isFetching) {
    // We are curently fetching the product list,
    // wait before sending a new request
    console.log("In the middle of fetching products")
    return null;
  }
  console.log("Fetching products");
  return dispatch(fetchProducts());
}

export const PRODUCT_BUY_REQUEST = 'PRODUCT_BUY_REQUEST';
export const PRODUCT_BUY_SUCCESS = 'PRODUCT_BUY_SUCCESS';
export const PRODUCT_BUY_FAILURE = 'PRODUCT_BUY_FAILURE';

const purchaseProduct = sku => ({
  [CALL_API]: {
    types: [ PRODUCT_BUY_REQUEST, PRODUCT_BUY_SUCCESS, PRODUCT_BUY_FAILURE ],
    endpoint: `products/${sku}`,
    method: 'POST'
  }
});

export const buyProduct = (sku) => (dispatch, getState) => {
  console.log("buyProduct =", sku);
  return dispatch(purchaseProduct(sku));
}

export const CONSENTS_REQUEST = 'CONSENTS_REQUEST';
export const CONSENTS_SUCCESS = 'CONSENTS_SUCCESS';
export const CONSENTS_FAILURE = 'CONSENTS_FAILURE';

const fetchConsents = () => ({
  [CALL_API]: {
    types: [ CONSENTS_REQUEST, CONSENTS_SUCCESS, CONSENTS_FAILURE ],
    endpoint: 'consents',
    method: 'GET'
  }
});

export const loadConsents = () => (dispatch, getState) => {
  const consents = getState().consents;
  if (consents && consents.isFetching) {
    // We are curently fetching the consents list,
    // wait before sending a new request
    console.log("In the middle of fetching consents")
    return null;
  }
  console.log("Fetching consents");
  return dispatch(fetchConsents());
}

export const CONSENT_SET_REQUEST = 'CONSENT_SET_REQUEST';
export const CONSENT_SET_SUCCESS = 'CONSENT_SET_SUCCESS';
export const CONSENT_SET_FAILURE = 'CONSENT_SET_FAILURE';

const putConsent = (consentId, accepted) => ({
  [CALL_API]: {
    types: [ CONSENT_SET_REQUEST, CONSENT_SET_SUCCESS, CONSENT_SET_FAILURE ],
    endpoint: `consents/${consentId}?accepted=${accepted}`,
    method: 'PUT',
    allowEmptyResponse: true
  }
});

export const setConsent = (consentId, accepted) => (dispatch, getState) => {
  console.log("Setting consent for ", consentId, accepted);
  return dispatch(putConsent(consentId, accepted))
    .then(() => {
      // Since the consents have changed, lets reload.
      console.log("Fetching consents");
      return dispatch(fetchConsents());
    });
}

export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const selectProduct = product => ({
  type: SELECT_PRODUCT,
  product
});

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

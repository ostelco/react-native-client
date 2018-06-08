import firebase from 'react-native-firebase'
import { getCurrentPseudonym } from './auth';

const analytics = firebase.analytics();

export const globalParams = {};

const _logEvent = (name, params) => {
  const pseudonym = getCurrentPseudonym();
  analytics.logEvent(name, { ...params, ...globalParams, pseudonym });
}

export const setCurrentScreen = (screenName) => {
  analytics.setCurrentScreen(screenName, screenName);
};

export const logGDPRPermissionEvent = params => {
  _logEvent('gdpr_permission', params);
};

export const logAddToCartEvent = product => {
  _logEvent('add_to_cart', {
    quantity: 1,
    price: (product.price.amount / 100.0).toFixed(2),
    value: (product.price.amount / 100.0).toFixed(2),
    currency: product.price.currency,
    item_id: product.sku,
    item_name: product.presentation.offerLabel,
    item_category: product.presentation.isDefault === "true" ? "default" : "special"
  });
};

export const logECommercePurchaseEvent = product => {
  _logEvent('ecommerce_purchase', {
    quantity: 1,
    price: (product.price.amount / 100.0).toFixed(2),
    value: (product.price.amount / 100.0).toFixed(2),
    currency: product.price.currency,
    item_id: product.sku,
    item_name: product.presentation.offerLabel,
    item_category: product.presentation.isDefault === "true" ? "default" : "special"
  });
};

export const logLoginEvent = () => {
  _logEvent('login', {
    sign_up_method: 'google'
  })
};

export const logSignUpEvent = () => {
  _logEvent('signup')
}

export default {
  setCurrentScreen,
}
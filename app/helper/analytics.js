import firebase from 'react-native-firebase'
import { getCurrentPseudonym } from './auth';
import {formatIntegerPrice} from "./price";

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

export const logAddToCartEvent = ({ amount, currency, sku, productLabel, itemCategory }) => {
  _logEvent('add_to_cart', {
    quantity: 1,
    price: Number(formatIntegerPrice(amount)),
    value: Number(formatIntegerPrice(amount)),
    currency,
    item_id: sku,
    item_name: productLabel,
    item_category: itemCategory,
  });
};

export const logECommercePurchaseEvent = ({ amount, currency, sku, label, itemCategory }) => {
  _logEvent('ecommerce_purchase', {
    quantity: 1,
    price: Number(formatIntegerPrice(amount)),
    value: Number(formatIntegerPrice(amount)),
    currency,
    item_id: sku,
    item_name: label,
    item_category: itemCategory,
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
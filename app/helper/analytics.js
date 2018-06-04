import firebase from 'react-native-firebase'

const analytics = firebase.analytics();

export const setCurrentScreen = (screenName) => {
  analytics.setCurrentScreen(screenName, screenName);
};

export const logGDPRPermissionEvent = params => {
  analytics.logEvent('gdpr_permission', params);
};

export const logAddToCartEvent = product => {
  analytics.logEvent('add_to_cart', {
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
  analytics.logEvent('ecommerce_purchase', {
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
  analytics.logEvent('login', {
    sign_up_method: 'google'
  })
};

export const logSignUpEvent = () => {
  analytics.logEvent('signup')
}

export default {
  setCurrentScreen,
}
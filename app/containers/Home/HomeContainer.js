import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as _ from "lodash";
import { connect } from 'react-redux';
import { loadSubscription, loadProducts, selectProduct } from "../../actions";
import screens from "../../helper/screens";
import {logAddToCartEvent} from "../../helper/analytics";
import { Alert } from "react-native";
import { compose } from 'recompose';
import { withInstabugWelcomeMessage } from '../../helper/enhancers';

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  formatDataLeft(subscription) {
    if (subscription.status) {
      return `${prettyBytes(subscription.status.remaining)}`;
    }
    return null;
  }

  _showMenu = () => {
    this.props.navigation.navigate(screens.Menu);
  };

  _showPayment = product => {
    this.props.selectProduct(product);
    logAddToCartEvent(product);
    this.props.navigation.navigate(screens.Payment);
  };

  render() {
    if (this.props.subscription.queried === true && this.props.subscription.isFetching === false && this.props.subscription.status === null) {
      Alert.alert('We would not find your subscription:-(', 'The app will not work as expected. Please contact one of the friendly developers, we can fix it for you!');
    }

    const dataLeft = this.formatDataLeft(this.props.subscription);
    return (
      <Home
        showMenu={this._showMenu}
        showPayment={this._showPayment}
        dataLeft={dataLeft}
        defaultOffer={this.props.defaultOffer}
        specialOffer={this.props.specialOffer}
        doUpdate={this.props.loadSubscription}
      />
    );
  }
}

function defaultProduct(products) {
  if (Array.isArray(products)) {
    const result = products.filter(product => _.get(product, "presentation.isDefault", "false") !== "false");
    if (result && result.length > 0) {
      // We only use 1 default product
      return result[0];
    }
    console.log("Cannot find any default products");
    return null;
  }
}

function customProduct(products, productSku) {
  if (Array.isArray(products)) {

    if (productSku) {
      const tmp = products.find(product => product.sku === productSku);
      if (tmp) {
        return tmp;
      }
    }
    const result = products.filter(product => _.get(product, "presentation.isDefault", "false") === "false");
    if (result && result.length > 0) {
      // We only use 1 special product
      return result[0];
    }
    console.log("Cannot find any custom products");
    return null;
  }
}

const mapStateToProps = (state) => {
  const { subscription, products, error, remoteConfig } = state;
  return {
    subscription,
    defaultOffer: defaultProduct(products.list),
    specialOffer: customProduct(products.list, remoteConfig.productSku),
    error
  };
};

export default compose(
  connect(mapStateToProps, {
    loadSubscription,
    loadProducts,
    selectProduct
  }),
  withInstabugWelcomeMessage,
)(HomeContainer);

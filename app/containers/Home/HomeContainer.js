import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as _ from "lodash";
import { connect } from 'react-redux';
import { loadProducts, selectProduct } from "../../actions";
import screens from "../../helper/screens";
import {logAddToCartEvent} from "../../helper/analytics";
import { Alert } from "react-native";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
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

    return (
      <Home
        showMenu={this._showMenu}
        showPayment={this._showPayment}
        specialOffer={this.props.specialOffer}
      />
    );
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
    specialOffer: customProduct(products.list, remoteConfig.productSku),
    error
  };
};

export default connect(mapStateToProps, {
  loadProducts,
  selectProduct
})(HomeContainer);

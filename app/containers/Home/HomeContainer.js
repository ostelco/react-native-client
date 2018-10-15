import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as _ from "lodash";
import { connect } from 'react-redux';
import {loadSubscription, loadProducts, selectProduct, cardSetAll, cardSetDefault} from "../../actions";
import screens from "../../helper/screens";
import {logAddToCartEvent} from "../../helper/analytics";
import { Alert } from "react-native";
import {compose, withState} from 'recompose';
import { withInstabugWelcomeMessage } from '../../helper/enhancers';
import {callApi} from "../../middleware/api";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showReferralMessage: !!props.navigation.getParam('showReferralMessage', false)
    }
  }

  formatDataLeft(remaining) {
    if (remaining) {
      return `${prettyBytes(remaining)}`;
    }
    return null;
  }

  _showMenu = () => {
    this.props.navigation.navigate(screens.Menu);
  };

  _showPayment = product => {
    this.props.selectProduct(product);
    logAddToCartEvent(product);
    this.props.setIsLoading(true);
    callApi('paymentSources', 'GET')
      .then(result => {
        if (result.length > 0) {
          return result;
        } else {
          throw "empty card list"
        }
      })
      .then(result => {
        // console.log('list sources result', result);

        this.props.cardSetAll(result);
        this.props.cardSetDefault(result[0].id);

        this.props.navigation.navigate(screens.Payment, {
          hasCards: true
        })
      })
      .catch(err => {
        console.log('list sources error', err);
        this.props.navigation.navigate(screens.Payment, {
          hasCards: false
        });
      })
      .finally(() => {
        this.props.setIsLoading(false)
      })
  };

  render() {
    if (this.props.subscription.queried === true && this.props.subscription.isFetching === false && this.props.subscription.status === null) {
      Alert.alert('We would not find your subscription:-(', 'The app will not work as expected. Please contact one of the friendly developers, we can fix it for you!');
    }

    const dataLeft = this.formatDataLeft(this.props.bundles.response && this.props.bundles.response.length > 0 && this.props.bundles.response[0].balance);
    return (
      <Home
        showMenu={this._showMenu}
        showPayment={this._showPayment}
        dataLeft={dataLeft}
        isLoading={this.props.isLoading}
        defaultOffer={this.props.defaultOffer}
        specialOffer={this.props.specialOffer}
        doUpdate={this.props.loadSubscription}
        showReferralMessage={this.state.showReferralMessage}
        closeReferralMessage={() => this.setState({ showReferralMessage: false })}
      />
    );
  }
}

function defaultProduct(products, sku) {
  if (Array.isArray(products)) {

    if (sku) {
      const tmp = products.find(product => product.sku === sku);
      if (tmp) {
        return tmp;
      }
    }

    const result = products.filter(product => _.get(product, "presentation.isDefault", "false") !== "false");

    if (result && result.length > 0) {
      // We only use 1 default product
      return result[0];
    }

    console.log("Cannot find any default products", products, sku);
    return null;
  }
}

function customProduct(products, sku) {
  if (Array.isArray(products)) {

    if (sku) {
      const tmp = products.find(product => product.sku === sku);
      if (tmp) {
        return tmp;
      }
    }

    const result = products.filter(product => _.get(product, "presentation.isDefault", "false") === "false");
    if (result && result.length > 0) {
      // We only use 1 special product
      return result[0];
    }

    console.log("Cannot find any custom products", products, sku);
    return null;
  }
}

const mapStateToProps = (state) => {
  const { subscription, products, error, remoteConfig, bundles } = state;
  return {
    subscription,
    bundles,
    defaultOffer: defaultProduct(products.list, remoteConfig.productSKU),
    specialOffer: customProduct(products.list, remoteConfig.offerSKU),
    error
  };
};

export default compose(
  connect(mapStateToProps, {
    loadSubscription,
    loadProducts,
    selectProduct,
    cardSetAll,
    cardSetDefault
  }),
  withInstabugWelcomeMessage,
  withState('isLoading', 'setIsLoading', false),
)(HomeContainer);

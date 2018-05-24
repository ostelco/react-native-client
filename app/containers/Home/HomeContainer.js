import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import { connect } from 'react-redux';
import { loadSubscription, loadProducts, selectProduct } from "../../actions";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  getDataLeft(remaining) {
    return `${prettyBytes(remaining)}`;
  }

  formatDataLeft(subscription) {
    if (subscription.status) {
      return `${prettyBytes(subscription.status.remaining)}`;
    }
    return null;
  }

  formatDefaultProduct(products) {
    if (products.list) {
      return products.list[0];
    }
    return null;
  }

  formatSpecialProducts(products) {
    if (products.list) {
      if (Array.isArray(products.list) && products.list.length > 1)
      return products.list[1];
    }
    return this.formatDefaultProduct(products);
  }

  _showMenu = () => {
    this.props.navigation.navigate('Menu');
  };

  _showPayment = product => {
    this.props.selectProduct(product);
    this.props.navigation.navigate('Payment');
  };

  render() {

    const dataLeft = this.formatDataLeft(this.props.subscription)
    const specialOffer = this.formatSpecialProducts(this.props.products)
    const defaultOffer = this.formatDefaultProduct(this.props.products)
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} dataLeft={dataLeft} defaultOffer={defaultOffer} specialOffer={specialOffer}/>
    )
  }
}

const mapStateToProps = (state) => {
  const { subscription, products } = state;
  return {
    subscription,
    products
  };
};

export default connect(mapStateToProps, {
  loadSubscription,
  loadProducts,
  selectProduct
})(HomeContainer);

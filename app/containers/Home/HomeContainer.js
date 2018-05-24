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
  componentDidMount() {
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
    //this.fetchSubscriptionStatus();
    //this.fetchProducts();
    this.props.loadSubscription();
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Old Props', prevProps)
    console.log('New Props', this.props)
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
  formatSpecialProducts(products) {
    if (products.list) {
      return products.list[0];
    }
    return null;
  }

  _showMenu = () => {
    this.props.navigation.navigate('Menu');
  };

  _showPayment = product => {
    console.log("_showPayment", product);
    this.props.selectProduct(product);
    this.props.navigation.navigate('Payment');
  };

  render() {

    const dataLeft = this.formatDataLeft(this.props.subscription)
    const specialOffer = this.formatSpecialProducts(this.props.products)
    const defaultOffer = this.formatSpecialProducts(this.props.products)
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} dataLeft={dataLeft} defaultOffer={defaultOffer} specialOffer={specialOffer}/>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  const { subscription, products } = state;
  return {
    subscription,
    products
  };
}

export default connect(mapStateToProps, {
  loadSubscription,
  loadProducts,
  selectProduct
})(HomeContainer)

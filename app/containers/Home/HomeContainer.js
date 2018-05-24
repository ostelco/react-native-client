import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as api from "../../helper/api";
import { connect } from 'react-redux';
import { loadSubscription, loadProducts } from "../../actions";

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

  fetchSubscriptionStatus() {
    api.getSubscriptionStatus()
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((subscription) => {
        console.log(JSON.stringify(subscription));
        this.setState({...this.state, dataLeft: this.getDataLeft(subscription.remaining)});
      })
      .catch((error) => {
        console.log('Error fetching the subscription', error)
      });
  }

  fetchProducts() {
    api.getProducts()
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((products) => {
        console.log(JSON.stringify(products));
        this.setState({...this.state, specialOffer: products[0]});
      })
      .catch((error) => {
        console.log('Error fetching the products', error)
      });
  }

  _showMenu = () => {
    this.props.navigation.navigate('Menu');
  };

  _showPayment = () => {
    this.props.navigation.navigate('Payment', {price: {amount: "25", currency: "NOK"}, itemDescription: "4 Gb", sku:"DataTopup4GB"})
  };

  render() {

    const dataLeft = this.formatDataLeft(this.props.subscription)
    const specialOffer = this.formatSpecialProducts(this.props.products)
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} dataLeft={dataLeft} specialOffer={specialOffer}/>
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
  loadProducts
})(HomeContainer)

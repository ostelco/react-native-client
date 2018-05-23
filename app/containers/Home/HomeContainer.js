import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as api from "../../helper/api";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
    this.fetchSubscriptionStatus();
    this.fetchProducts();
  }

  getDataLeft(remaining) {
    return `${prettyBytes(remaining)}`;
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
    this.props.navigation.navigate('Payment')
  };

  render() {
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} dataLeft={this.state.dataLeft} specialOffer={this.state.specialOffer}/>
    )
  }
}

export default HomeContainer;

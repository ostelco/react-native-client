import React from "react";
import Home from "./Home";
import { getProducts, getSubscriptionStatus } from "../../utils/api";
import { getAuthHeader } from "../../utils/authutils";

const productList = [
  { sku: "Basic", price: {amount: 40, currency: "NOK"} },
  { sku: "Special", price: {amount: 100, currency: "NOK"} }
]
class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    console.log("HomeContainer componentDidMount")
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
    this.fetchSubscriptionStatus();
    this.fetchProducts();
  }

  fetchSubscriptionStatus() {
    getSubscriptionStatus(getAuthHeader())
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((subscription) => {
        console.log(JSON.stringify(subscription));
        this.setState({...this.state, dataLeft: `${subscription.remaining}`})
        return this.state;
      })
      .catch((error) => {
        console.log('Error fetching the subscription', error)
      });
  };
  fetchProducts() {
    getProducts(getAuthHeader())
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((products) => {
        console.log(JSON.stringify(products));
        return products;
      })
      .catch((error) => {
        console.log('Error fetching the products', error)
      });
  };

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

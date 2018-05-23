import React from "react";
import Home from "./Home";
import { getProducts } from "../../utils/api";
import { getAuthHeader } from "../../utils/authutils";

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
    this.fetchProducts();
  }

  componentDidUpdate() {
    console.log("HomeContainer componentDidUpdate")
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
    this.fetchProducts();
  }

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
        console.log('Error fetching the products')
        //console.error(error);
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

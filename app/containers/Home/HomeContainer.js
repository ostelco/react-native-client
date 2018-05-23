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
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
    this.state.authHeader = getAuthHeader();
    this.fetchProducts();
  }

  fetchProducts() {
    // getProducts(this.state.authHeader)
    //   .then((response) => response.json())
    //   .catch((error) => {
    //     console.error(error);
    //   });
    getProducts(this.state.authHeader)
      .then((response) => {
        console.log(JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
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

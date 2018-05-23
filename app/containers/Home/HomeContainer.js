import React from "react";
import Home from "./Home";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // TODO:
    // - Fetch data left and update the state: this.setState({ dataLeft: ... });
    // - Fetch offers and update the state: this.setState({ specialOffer: ... });
  }

  _showMenu = () => {
    this.props.navigation.navigate('Menu');
  };

  _showPayment = () => {
    this.props.navigation.navigate('Payment', {price: "23 NOK", topUpAmount: "4 Gb"})
  };

  render() {
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} dataLeft={this.state.dataLeft} specialOffer={this.state.specialOffer}/>
    )
  }
}

export default HomeContainer;

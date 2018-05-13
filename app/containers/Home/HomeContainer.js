import React from "react";
import Home from "./Home";

class HomeContainer extends React.Component {

  _showMenu = () => {
    this.props.navigation.navigate('Menu');
  };

  _showPayment = () => {
    this.props.navigation.navigate('Payment')
  };

  render() {
    return (
      <Home showMenu={this._showMenu} showPayment={this._showPayment} />
    )
  }
}

export default HomeContainer;

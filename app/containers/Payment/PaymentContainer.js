import React from "react";
import Payment from "./Payment";

class PaymentContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <Payment cancel={this._goBack} confirm={this._handlePayment} />
    )
  }
}

export default PaymentContainer;

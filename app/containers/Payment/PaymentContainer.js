import React from "react";
import Payment from "./Payment";

class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false
    }
  }

  _goBack = () => {
    this.setState({ isDialogVisible: false });
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    // this.props.navigation.navigate('Confetti');
    this.setState({ isDialogVisible: true });
  };

  render() {
    return (
      <Payment goBack={this._goBack} confirm={this._handlePayment} isDialogVisible={this.state.isDialogVisible} />
    )
  }
}

export default PaymentContainer;

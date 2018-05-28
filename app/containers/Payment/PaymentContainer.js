import React from "react";
import Payment from "./Payment";
import { buyProduct } from "../../actions";
import { connect } from 'react-redux';

class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
    }
  }

  _goBack = () => {
    this.setState({ isDialogVisible: false });
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    this.setState({ isDialogVisible: true });

    console.log('Buying sku', this.props.selectedProduct.sku)
    this.props.buyProduct(this.props.selectedProduct.sku)
  };

  render() {
    return (
      <Payment goBack={this._goBack} confirm={this._handlePayment} isDialogVisible={this.state.isDialogVisible} price={this.props.selectedProduct.price} itemDescription={this.props.selectedProduct.sku}/>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);
  const { error, selectedProduct } = state;
  return {
    error,
    selectedProduct
  };
};

export default connect(mapStateToProps, {
  buyProduct
})(PaymentContainer);



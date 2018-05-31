import React from "react";
import Payment from "./Payment";
import { buyProduct } from "../../actions";
import { connect } from 'react-redux';
import * as _ from "lodash";
import {logECommercePurchaseEvent} from "../../helper/analytics";

class PaymentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
    }
  }

  _goBack = () => {
    this.setState({ isDialogVisible: false });
    logECommercePurchaseEvent(this.props.selectedProduct);
    this.props.navigation.pop();
  };

  _handlePayment = () => {
    this.setState({ isDialogVisible: true });

    console.log('Buying sku', this.props.selectedProduct.sku)
    this.props.buyProduct(this.props.selectedProduct.sku)
  };

  render() {
    const productLabel = _.get(this.props.selectedProduct, "presentation.productLabel", "");
    const priceLabel = _.get(this.props.selectedProduct, "presentation.priceLabel", "");
    return (
      <Payment
        goBack={this._goBack}
        confirm={this._handlePayment}
        isDialogVisible={this.state.isDialogVisible}
        priceLabel={priceLabel}
        productLabel={productLabel}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, selectedProduct } = state;
  return {
    error,
    selectedProduct
  };
};

export default connect(mapStateToProps, {
  buyProduct
})(PaymentContainer);



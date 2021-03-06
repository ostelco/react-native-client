import React from "react";
import PurchaseHistory from "./PurchaseHistory";
import { connect } from 'react-redux';

class PurchaseHistoryContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
      return (
        <PurchaseHistory
          purchaseRecords={this.props.purchaseRecords}
          goBack={this._goBack}
        />);
    }
}

const mapStateToProps = (state) => {
    const { error, purchaseHistory } = state;
    return {
        purchaseRecords: purchaseHistory.response !== null && purchaseHistory.response || [],
      error
    };
  };

export default connect(mapStateToProps)(PurchaseHistoryContainer);

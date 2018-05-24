import React from "react";
import PurchaseHistory from "./PurchaseHistory";

class PurchaseHistoryContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
        return (
          <PurchaseHistory goBack={this._goBack} />
        )
    }
}

export default PurchaseHistoryContainer;
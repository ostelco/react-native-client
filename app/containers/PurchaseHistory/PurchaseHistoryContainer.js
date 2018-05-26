import React from "react";
import PurchaseHistory from "./PurchaseHistory";

class PurchaseHistoryContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
      const data = [{
        title: "2018-04-12",
        description: "1 GB",
        priceLabel: "25 NOK"
      }, {
        title: "2018-04-12",
        description: "1 GB",
        priceLabel: "25 NOK"
      }, {
        title: "2018-04-12",
        description: "1 GB",
        priceLabel: "25 NOK"
      }];
        return (
          <PurchaseHistory goBack={this._goBack} data={data} />
        )
    }
}

export default PurchaseHistoryContainer;
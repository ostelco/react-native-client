import React from "react";
import TermsAndConditions from "./TermsAndConditions";

class TermsAndConditionsContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <TermsAndConditions goBack={this._goBack} />
    )
  }
}

export default TermsAndConditionsContainer;

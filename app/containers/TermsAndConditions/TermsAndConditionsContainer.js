import React from "react";
import TermsAndConditions from "./TermsAndConditions";

class TermsAndConditionsContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const isModal = navigation.getParam('isModal', false);
    return (
      <TermsAndConditions goBack={this._goBack} isModal={isModal} />
    )
  }
}

export default TermsAndConditionsContainer;

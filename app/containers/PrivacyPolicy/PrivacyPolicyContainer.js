import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";

class PrivacyPolicyContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
        return (
          <PrivacyPolicy goBack={this._goBack} />
        )
    }
}
  
export default PrivacyPolicyContainer;
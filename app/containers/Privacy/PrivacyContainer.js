import React from "react";
import Privacy from "./Privacy";

class PrivacyContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.pop();
    };

    _showPrivacyPolicy = () => {
        this.props.navigation.navigate('PrivacyPolicy');
    };
    
    _showTermsAndConditions = () => {
        this.props.navigation.navigate('TermsAndConditions')
    };

    render() {
        return (
          <Privacy goBack={this._goBack} showPrivacyPolicy={this._showPrivacyPolicy} showTermsAndConditions={this._showTermsAndConditions}/>
        )
    }
}

export default PrivacyContainer;
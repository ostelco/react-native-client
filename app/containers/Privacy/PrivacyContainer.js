import React from "react";
import Privacy from "./Privacy";
import { connect } from 'react-redux';
import { setConsent } from "../../actions";

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
      <Privacy
        goBack={this._goBack}
        consent={this.props.privacy}
        setConsent={this.props.setConsent}
        showPrivacyPolicy={this._showPrivacyPolicy}
        showTermsAndConditions={this._showTermsAndConditions}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { consents, error } = state;
  return {
    privacy: consents.privacy || { accepted: true },
    error
  };
};

export default connect(mapStateToProps, {
  setConsent
})(PrivacyContainer);

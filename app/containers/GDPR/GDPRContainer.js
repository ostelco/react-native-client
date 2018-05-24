import React from "react";
import GDPR from "./GDPR";
import { connect } from 'react-redux';
import { setConsent } from "../../actions";

class GDPRContainer extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    console.log("GDPRContainer ", this.props.consents)
  }

  _showHome = (consentId, accepted) => {
    // Send consent true / false to server
    this.props.setConsent(consentId, accepted);
    this.props.navigation.navigate('App');
  }

  getPrivacyConsent() {
    const { consents } = this.props;
    if (consents && Array.isArray(consents.list)) {
      return this.props.consents.list.find( consent => consent.consentId === 'privacy');
    }
    return null;
  }
  render() {
    return (
      <GDPR confirm={this._showHome} consent={this.getPrivacyConsent()}/>
    )
  }
}

const mapStateToProps = (state) => {
  const { consents, error } = state;
  return {
    consents,
    error
  };
};

export default connect(mapStateToProps, {
  setConsent
})(GDPRContainer);

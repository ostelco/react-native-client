import React from "react";
import GDPR from "./GDPR";
import { connect } from 'react-redux';
import { setConsent } from "../../actions";
import screens from "../../helper/screens";
import {logGDPRPermissionEvent} from "../../helper/analytics";

class GDPRContainer extends React.Component {

  _showHome = (consentId, accepted) => {
    // Send consent true / false to server
    this.props.setConsent(consentId, accepted);
    logGDPRPermissionEvent({
      did_accept: accepted
    });
    this.props.navigation.navigate(screens.Home);
  }

  render() {
    return (
      <GDPR confirm={this._showHome} consent={this.props.privacy}/>
    )
  }
}

const mapStateToProps = (state) => {
  const { consents, error } = state;
  return {
    privacy: consents.privacy,
    error
  };
};

export default connect(mapStateToProps, {
  setConsent
})(GDPRContainer);

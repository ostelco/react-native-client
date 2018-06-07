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
      <GDPR confirm={this._showHome} consent={this.props.privacy} presentationData={this.props.presentationData} />
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

import { graphql, compose } from 'react-apollo'
import { LoadingPlaceholder } from "../../components";
import { renderWhileLoading } from "../../helper/enhancers";
import { getGDPR } from "../../helper/graphql";
import { withProps } from 'recompose';

export default compose(
  connect(mapStateToProps, { setConsent }),
  graphql(getGDPR),
  renderWhileLoading(LoadingPlaceholder),
  withProps(({ data }) => {
    return ({
      presentationData: {
        ...data['GDPR'].translations[0],
        consents: data['GDPR'].gDPRFields.map(x => ({
          icon: x.icon,
          id: x.id,
          description: x.translations[0].description
        }))
      }
    })
  })
)(GDPRContainer);

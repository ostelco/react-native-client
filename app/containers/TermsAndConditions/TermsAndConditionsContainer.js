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
      <TermsAndConditions goBack={this._goBack} isModal={isModal} presentationData={this.props.presentationData}/>
    )
  }
}

import { graphql, compose } from 'react-apollo'
import { LoadingPlaceholder } from "../../components";
import { renderWhileLoading } from "../../helper/enhancers";
import { getTermsAndConditions } from "../../helper/graphql";
import { withProps } from 'recompose';

export default compose(
  graphql(getTermsAndConditions),
  renderWhileLoading(LoadingPlaceholder),
  withProps(({ data }) => {
    return ({
      presentationData: {
        ...data['TermsAndConditions'].translations[0],
        paragraphs: data['TermsAndConditions'].listOfTexts.map(x => x.multiLineText.map(y => ({ id: y.id, ...y.translations[0] })))[0]
      }
    })
  })
)(TermsAndConditionsContainer);

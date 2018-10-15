import React from "react";
import Privacy from "./Privacy";
import { connect } from 'react-redux';
import screens from "../../helper/screens";
import {compose} from "recompose";

class PrivacyContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <Privacy
        goBack={this._goBack}
      />
    )
  }
}

export default compose(

)(PrivacyContainer);

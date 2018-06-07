import React from "react";
import Signup from "./Signup";
import { connect } from 'react-redux';
import {
  createProfile,
 } from "../../actions";
import screens from "../../helper/screens";
import {logSignUpEvent} from "../../helper/analytics";

class SignupContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: this.props.auth.name,
        address: '',
        postCode: '',
        city: '',
        country: '',
        email: this.props.auth.email
      }
    };
  }

  _goBack = () => {
    this.props.navigation.goBack()
  };

  _showGDPR = () => {

    this.props.createProfile(this.state.profile)
    .then(() => {
      logSignUpEvent();
      this.props.navigation.navigate(screens.GDPR)
    });
  };

  _handleChange = key => text => {
    let { profile } = this.state;
    profile[key] = text;
    this.setState({ profile })
  }

  render() {
    return (
      <Signup
        goBack={this._goBack}
        showNext={this._showGDPR}
        profile={this.state.profile}
        presentationData={this.props.presentationData}
        handleChange={this._handleChange}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, profile, auth } = state;
  console.log("SignupContainer profile ",profile);
  return {
    error,
    profile,
    auth
  };
};

import { graphql, compose } from 'react-apollo'
import { LoadingPlaceholder } from "../../components";
import { renderWhileLoading } from "../../helper/enhancers";
import { getSignUp } from "../../helper/graphql";
import { withProps } from 'recompose';

export default compose(
  connect(mapStateToProps, { createProfile }),
  graphql(getSignUp),
  renderWhileLoading(LoadingPlaceholder),
  withProps(({ data }) => {
    return ({ presentationData: {
      ...data['SignUp'].translations.find(y => y.language === 'EN_US'),
      fields: data['SignUp']['textInputField'].map(x => ({
          key: x.key,
          ...x.translations.find(y => y.language === 'EN_US')
        }))
      }})
  })
)(SignupContainer);

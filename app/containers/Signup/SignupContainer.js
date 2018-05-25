import React from "react";
import Signup from "./Signup";
import { connect } from 'react-redux';
import {
  createProfile,
 } from "../../actions";

class SignupContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: this.props.auth.name,
        address: '',
        postCode: '',
        city: '',
        email: this.props.auth.email
      }
    };
  }

  _goBack = () => {
    this.props.navigation.goBack()
  };

  _showGDPR = () => {
    this.props.createProfile(this.state.profile)
    .then(() => this.props.navigation.navigate('GDPR'));
  };

  _handleNameChanged = (text) => {
    let { profile } = this.state;
    profile.name = text;
    this.setState({profile});
  };
  _handleAddressChanged = (text) => {
    let { profile } = this.state;
    profile.address = text;
    this.setState({profile});
  };
  _handlePostCodeChanged = (text) => {
    let { profile } = this.state;
    profile.postCode = text;
    this.setState({profile});
  };
  _handleCityChanged = (text) => {
    let { profile } = this.state;
    profile.city = text;
    this.setState({profile});
  };

  render() {
    return (
      <Signup
        goBack={this._goBack}
        showNext={this._showGDPR}
        profile={this.state.profile}
        handleNameChanged={this._handleNameChanged}
        handleAddressChanged={this._handleAddressChanged}
        handlePostCodeChanged={this._handlePostCodeChanged}
        handleCityChanged={this._handleCityChanged}
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

export default connect(mapStateToProps, {
  createProfile
})(SignupContainer);

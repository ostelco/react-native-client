import React from "react";
import Signup from "./Signup";
import { connect } from 'react-redux';
import {
  createProfile,
 } from "../../actions";
import screens from "../../helper/screens";
import {logSignUpEvent} from "../../helper/analytics";
import {AsyncStorage} from "react-native";

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

  _showGDPR = async () => {

    const invitedBy = await AsyncStorage.getItem('@app:invited-by');
    this.props.createProfile(this.state.profile, invitedBy)
    .then(() => {
      logSignUpEvent();
      this.props.navigation.navigate(screens.GDPR)
    });
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

  _handleCountryChanged = (text) => {
    let { profile } = this.state;
    profile.country = text;
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
        handleCountryChanged={this._handleCountryChanged}
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

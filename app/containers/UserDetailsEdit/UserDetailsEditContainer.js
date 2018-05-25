import React from "react";
import UserDetailsEdit from "./UserDetailsEdit";
import { connect } from 'react-redux';
import {
  updateProfile,
 } from "../../actions";

class UserDetailsEditContainer extends React.Component {

  constructor(props) {
    super(props)
    const { navigation } = this.props;
    const profile = navigation.getParam('profile');
    const profileKey= navigation.getParam('profileKey');
    this.state = { profile, profileKey };
  }

  _onCancel = () => {
    this.props.navigation.pop();
  };

  _onSubmit = () => {
    console.log("New Profile = ", this.state.profile);
    this.props.updateProfile(this.state.profile)
    .then(() => this.props.navigation.pop());
  };
  _onChangeText = (text) => {
    this.state.profile[this.state.profileKey] = text;
  }
  render() {
    const { navigation } = this.props;
    const label = navigation.getParam('label');
    const value = this.state.profile[this.state.profileKey] || '';
    const multiline = navigation.getParam('multiline', false);

    return (
      <UserDetailsEdit
        label={label}
        value={value}
        multiline={multiline}
        onChangeText={this._onChangeText}
        onCancel={this._onCancel}
        onSubmit={this._onSubmit}
       />
    )
  }
}

const mapStateToProps = (state) => {
  const { error, profile } = state;
  console.log("UserDetailsEditContainer profile ",profile);
  return {
    error,
    profile: profile.data
  };
};

export default connect(mapStateToProps, {
  updateProfile
})(UserDetailsEditContainer);

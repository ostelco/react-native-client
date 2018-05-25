import React from "react";
import UserDetailsEdit from "./UserDetailsEdit";

class UserDetailsEditContainer extends React.Component {

  _onCancel = () => {
    this.props.navigation.pop();
  };

  _onSubmit = () => {
    // TODO: Save info to server (need user identifier to call API) and update profile in redux
    this.props.navigation.pop();
  };

  render() {
    const { navigation } = this.props;
    const label = navigation.getParam('label');
    const value = navigation.getParam('value');
    const multiline = navigation.getParam('multiline', false);

    return (
      <UserDetailsEdit label={label} value={value} onCancel={this._onCancel} onSubmit={this._onSubmit} multiline={multiline} />
    )
  }
}

export default UserDetailsEditContainer;

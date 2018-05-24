import React from "react";
import DeleteAccount from "./DeleteAccount";

class DeleteAccountContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _showLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <DeleteAccount goBack={this._goBack} showLogin={this._showLogin}/>
    )
  }
}

export default DeleteAccountContainer;

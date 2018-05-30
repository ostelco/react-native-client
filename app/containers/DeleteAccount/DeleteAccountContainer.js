import React from "react";
import DeleteAccount from "./DeleteAccount";
import screens from "../../helper/screens";

class DeleteAccountContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _showLogin = () => {
    this.props.navigation.navigate(screens.Login);
  };

  render() {
    return (
      <DeleteAccount goBack={this._goBack} showLogin={this._showLogin}/>
    )
  }
}

export default DeleteAccountContainer;

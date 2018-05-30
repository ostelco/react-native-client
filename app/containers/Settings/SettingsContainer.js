import React from "react";
import Settings from "./Settings";
import { auth0 } from '../../helper/auth';

class SettingsContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.pop();
  };

  _showUserDetails = () => {
    this.props.navigation.navigate('UserDetails');
  };

  _showPrivacy = () => {
    this.props.navigation.navigate('Privacy');
  };

  _showPurchaseHistory = () => {
    this.props.navigation.navigate('PurchaseHistory');
  };

  _showDeleteAccount = () => {
    this.props.navigation.navigate('DeleteAccount');
  };

  _handleLogout = () => {
    auth0.webAuth.clearSession()
      .finally(() => {
        this.props.navigation.navigate('OnBoarding');
      });
  };

  render() {
    return (
      <Settings goBack={this._goBack} showUserDetails={this._showUserDetails} showPrivacy={this._showPrivacy} showPurchaseHistory={this._showPurchaseHistory} showDeleteAccount={this._showDeleteAccount} handleLogout={this._handleLogout}/>
    )
  }
}

export default SettingsContainer;
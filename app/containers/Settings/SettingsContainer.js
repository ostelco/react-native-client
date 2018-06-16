import React from "react";
import Settings from "./Settings";
import { auth0 } from '../../helper/auth';
import { userLogout } from "../../actions";
import { connect } from 'react-redux';
import screens from "../../helper/screens";
import Instabug from 'instabug-reactnative';

class SettingsContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.pop();
  };

  _showUserDetails = () => {
    this.props.navigation.navigate(screens.UserDetails);
  };

  _showPrivacy = () => {
    this.props.navigation.navigate(screens.Privacy);
  };

  _showPurchaseHistory = () => {
    this.props.navigation.navigate(screens.PurchaseHistory);
  };

  _showDeleteAccount = () => {
    this.props.navigation.navigate(screens.DeleteAccount);
  };

  _handleLogout = () => {
    this.props.userLogout();
    return auth0.webAuth.clearSession()
      .finally(() => {
        Instabug.logOut();
        this.props.navigation.navigate(screens.OnBoarding);
      });
  };

  _handleShowSignUp = () => {
    this.props.navigation.navigate(screens.OnBoarding, {
      forceSignUp: true
    });
  };

  render() {
    return (
      <Settings
        goBack={this._goBack}
        showUserDetails={this._showUserDetails}
        showPrivacy={this._showPrivacy}
        showPurchaseHistory={this._showPurchaseHistory}
        showDeleteAccount={this._showDeleteAccount}
        handleLogout={this._handleLogout}
        handleShowSignUp={this._handleShowSignUp}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { error } = state;
  return {
    error
  };
};

export default connect(mapStateToProps, {
  userLogout
})(SettingsContainer);

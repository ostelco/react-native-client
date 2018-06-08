import React from "react";
import Settings from "./Settings";
import { auth0 } from '../../helper/auth';
import { userLogout } from "../../actions";
import { connect } from 'react-redux';
import screens from "../../helper/screens";

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
        this.props.navigation.navigate(screens.OnBoarding);
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

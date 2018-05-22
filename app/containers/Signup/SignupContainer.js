import React from "react";
import Signup from "./Signup";

class SignupContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack()
  };

  _showGDPR = () => {
    // TODO: save profile data to server
    this.props.navigation.navigate('GDPR')
  };

  render() {
    const { navigation } = this.props;
    const profile = navigation.getParam('profile', {
      name: 'David Berg'
    });
    return (
      <Signup goBack={this._goBack} showNext={this._showGDPR} profile={profile} />
    )
  }
}

export default SignupContainer;

import React from "react";
import Signup from "./Signup";

class SignupContainer extends React.Component {

  _goBack = () => {
    this.props.navigation.goBack()
  };

  _showGDPR = () => {
    this.props.navigation.navigate('GDPR')
  };

  render() {
    return (
      <Signup goBack={this._goBack} showNext={this._showGDPR} />
    )
  }
}

export default SignupContainer;

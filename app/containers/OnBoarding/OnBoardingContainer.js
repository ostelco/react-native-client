import React from "react";
import OnBoarding from "./OnBoarding";

class OnBoardingContainer extends React.Component {

  _signIn = () => {
    this.props.navigation.navigate('Signup')
  };

  _showTermsAndConditions = () => {
    this.props.navigation.navigate('TermsAndConditions');
  };

  render() {
    return (
      <OnBoarding signIn={this._signIn} showTermsAndConditions={this._showTermsAndConditions} />
    )
  }
}

export default OnBoardingContainer;

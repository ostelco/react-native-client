import React from "react";
import OnBoarding from "./OnBoarding";
import jwtDecoder from 'jwt-decode'
import { Alert } from "react-native";

// TODO: Move to configuration file or variables.js
const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';
const authorize_url = `https://${AUTH0_DOMAIN}/authorize`;

// TODO: Move to utils file
const toQueryString = params => {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
};

class OnBoardingContainer extends React.Component {

  _loginWithAuth0 = async () => {

  };

  handleParams = (responseObj) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
        || 'something went wrong while logging in');
      return;
    }
    const encodedToken = responseObj.access_token;
    const decodedToken = jwtDecoder(encodedToken);

    console.log(decodedToken);

    return fetch('https://pantel-2decb.appspot.com/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ encodedToken
      },
      body: JSON.stringify({
        name: 'Prasanth Ullattil',
        email: 'prasanth.u@gmail.com',
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };

  _signIn = async () => {
    // const profile = await this._loginWithAuth0();
    const profile = {};
    this.props.navigation.navigate('Signup', { profile });
  };

  _showTermsAndConditions = async () => {
    this.props.navigation.navigate('TermsAndConditions');
  };

  render() {
    return (
      <OnBoarding signIn={this._signIn} showTermsAndConditions={this._showTermsAndConditions} />
    )
  }
}

export default OnBoardingContainer;

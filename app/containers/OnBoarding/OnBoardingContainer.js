import React from "react";
import OnBoarding from "./OnBoarding";
import { AsyncStorage } from "react-native";
import Auth0 from 'react-native-auth0';


// TODO: Move to configuration file or variables.js
const auth0ClientId = 'VI2jUFFEUMyOz1ZoWALu0UwKK9D2uHa7';
const AUTH0_DOMAIN = 'ostelco.eu.auth0.com';

// TODO: Move to utils file
const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: auth0ClientId });


class OnBoardingContainer extends React.Component {

  _getProfile = async () => {
    const authToken = await AsyncStorage.getItem('@app:session');
    return fetch('https://pantel-2decb.appspot.com/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ authToken
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
  }

  _signIn = async () => {
    console.log('signIn');

    await auth0
      .webAuth
      .authorize({scope: 'openid profile', audience: 'http://google_api', connection: 'google-oauth2', response_type: 'token'})
      .then(credentials => {
        console.log(credentials);
        return AsyncStorage.setItem('@app:session', credentials.accessToken)
      })
      .catch(error => console.log(error));

    const profile = await this._getProfile();
    console.log(profile);
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

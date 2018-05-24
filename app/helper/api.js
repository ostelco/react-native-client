import { AsyncStorage } from "react-native";

async function getAuthHeader() {
    const value = await AsyncStorage.getItem('@app:session');
    if (value !== null) {
      // We have data!!
      console.log(value);
      return `Bearer ${value}`;
    } else {
      return null;
    }
}

export async function getProducts() {
  const authHeader = await getAuthHeader();
  return fetch('https://api.ostelco.org/products', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader
    }
  });
}

export async function getSubscriptionStatus() {
  const authHeader = await getAuthHeader();
  return fetch('https://api.ostelco.org/subscription/status', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authHeader
    }
  });
}


import { AsyncStorage } from "react-native";

async function getAuthHeader() {
    const value = await AsyncStorage.getItem('@app:session');
    if (value !== null) {
      return `Bearer ${value}`;
    } else {
      return null;
    }
}

const API_ROOT = 'https://api.ostelco.org/'

const callApi = async (endpoint, method, allowEmptyResponse) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const authHeader = await getAuthHeader();
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: authHeader
    }
  };
  return fetch(fullUrl, options)
    .then(response => {
      console.log("Response = ", response);
      return response.text().then(text => {
        let json = null;
        let exception = null;
        // Capture any JSON parse exception.
        try {
          json = JSON.parse(text);
        } catch(e) {
          exception = e;
        }
        // Ignore exceptions for allowed empty responses
        if (allowEmptyResponse && allowEmptyResponse === true) {
          return {};
        }
        // Rethrow any parse exceptions.
        if (exception !== null) {
          throw exception;
        }
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, allowEmptyResponse } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, allowEmptyResponse).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
}

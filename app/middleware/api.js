import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
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

const API_ROOT = 'https://api.ostelco.org/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (endpoint, schema, method) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log('URL = ', fullUrl);
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
      return response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }
          return json;
        })
      }
    )
  // return fetch(fullUrl)
  //   .then(response =>
  //     response.json().then(json => {
  //       if (!response.ok) {
  //         return Promise.reject(json)
  //       }

  //       const camelizedJson = camelizeKeys(json)
  //       return Object.assign({}, normalize(camelizedJson, schema))
  //     })
  //   )
}

const subscriptionSchema = new schema.Entity('subscription', {},)

// Schemas for API responses.
export const Schemas = {
  SUBSCRIPTION: subscriptionSchema
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, method } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema, method).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}

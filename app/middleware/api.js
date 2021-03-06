import { getAuthHeader } from '../helper/auth'
import Config from 'react-native-config'

const API_ROOT = Config.API_URL;

export const callApi = async (endpoint, method, body, allowEmptyResponse, params = []) => {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  // TODO: Params can contain invalid characters and should be url encoded
  if (params.length > 0) {
    fullUrl += `?${params.join('&')}`;
  }
  const authHeader = await getAuthHeader();
  if (!authHeader) {
    return Promise.reject("Authentication failed");
  }
  let options = {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: authHeader
    }
  };
  if (body) {
    options.body = body;
    options.headers['content-type'] = 'application/json';
  }
  // console.log('Calling', fullUrl, options);
  // console.log('CallingUrl', fullUrl);
  // console.log('CallingOptions', JSON.stringify(options));
  return fetch(fullUrl, options)
    .then(response => {
      return response.text().then(text => {
        console.log(`Response text for -> ${fullUrl} ==> [${text}]`);
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

        // console.log(fullUrl, JSON.stringify(json))
        return json;
      });
    })
    .catch(err => {
      console.log('---------------------\nRequest failed: ', fullUrl, 'With error: ', err, '\n---------------------------');
      throw err
    })
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
  const { types, method, body, allowEmptyResponse, params = [] } = callAPI;

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

  return callApi(endpoint, method, body, allowEmptyResponse, params).then(
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

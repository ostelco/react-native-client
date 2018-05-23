
export function getProducts(authHeader) {
  return fetch('https://api.ostelco.org/products', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: authHeader
        }
      });
}

export function getSubscriptionStatus(authHeader) {
  return fetch('https://api.ostelco.org/subscription/status', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: authHeader
        }
      });
}

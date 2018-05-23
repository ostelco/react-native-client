
export function getProducts(authHeader) {
  console.log(authHeader)
  return fetch('https://api.ostelco.org/products', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: authHeader
        }
      });
}

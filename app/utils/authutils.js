import tempToken from './token.json';

export function getAuthHeader() {
  return `Bearer ${tempToken.accessToken}`;
}

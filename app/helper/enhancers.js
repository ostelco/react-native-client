import { connect } from 'react-redux';

export const withProfileFromState = connect(({ profile }) => ({ profile }));
export const withRefreshTokenFromState = connect(({ auth }) => ({ refreshToken: auth && auth.refreshToken }));
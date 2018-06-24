import { connect } from 'react-redux';

export const withProfileFromState = connect(({ profile }) => ({ profile }));

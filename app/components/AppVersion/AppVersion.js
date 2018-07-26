import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { version } from '../../../package';

const AppVersion = props => {
  const { version, style } = props;
  return (
    <Text style={style.text}>({ version })</Text>
  )
};

AppVersion.propTypes = {
  version: PropTypes.string.isRequired
};

AppVersion.defaultProps = {
  version,
  style: styles,
};

export default AppVersion;

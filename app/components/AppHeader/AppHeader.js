import React from "react";
import {Header} from "native-base";
import styles from './styles';
import PropTypes from 'prop-types';
import {colors} from "../../config/colors";

const AppHeader = props => {
  const { children } = props;
  return (
    <Header style={props.style} noShadow androidStatusBarColor={colors.rosa}>
      {children}
    </Header>
  )
};

AppHeader.propTypes = {
  style: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string
};

AppHeader.defaultProps = {
  style: styles.header,
};

export default AppHeader;

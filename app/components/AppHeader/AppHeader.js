import React from "react";
import {Header} from "native-base";
import styles from './styles';
import PropTypes from 'prop-types';
import {colors} from "../../config/colors";

const AppHeader = props => {
  const { children, backgroundColor, style } = props;
  return (
    <Header style={[style, { backgroundColor }]} noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'}>
      {children}
    </Header>
  )
};

export const AppHeaderWhite = props => {
  const { children } = props;
  return (
    <AppHeader backgroundColor={colors.white}>
      {children}
    </AppHeader>
  )
};

export const AppHeaderRosa = props => {
  const { children } = props;
  return (
    <AppHeader backgroundColor={colors.rosa}>
      {children}
    </AppHeader>
  )
};

AppHeader.propTypes = {
  style: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired
};

AppHeader.defaultProps = {
  style: styles.header,
  backgroundColor: 'transparent'
};

export default AppHeader;

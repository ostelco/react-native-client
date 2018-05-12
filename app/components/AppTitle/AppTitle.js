import React from "react";
import {Text} from "native-base";
import styles from "./styles";
import PropTypes from 'prop-types';

const AppTitle = props => {
  const { text } = props;
  return (
    <Text style={props.style}>{text}</Text>
  )
};

AppTitle.propTypes = {
  style: PropTypes.number,
  text: PropTypes.string
};

AppTitle.defaultProps = {
  style: styles.title,
  text: "BUTTON DEFAULT TEXT"
};

export default AppTitle;

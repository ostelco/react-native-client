import React from "react";
import {Text} from "native-base";
import styles from "./styles";
import PropTypes from 'prop-types';

const ScreenTitle = props => {
  const { text } = props;
  return (
    <Text style={props.style}>{text}</Text>
  )
};

ScreenTitle .propTypes = {
  style: PropTypes.number,
  text: PropTypes.string
};

ScreenTitle .defaultProps = {
  style: styles.title,
  text: "BUTTON DEFAULT TEXT"
};

export default ScreenTitle ;

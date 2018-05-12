import React from "react";
import {Text} from "native-base";
import styles from "./styles";
import PropTypes from 'prop-types';

const Title = props => {
  const { text } = props;
  return (
    <Text style={props.style}>{text}</Text>
  )
};

Title.propTypes = {
  style: PropTypes.number,
  text: PropTypes.string
};

Title.defaultProps = {
  style: styles.title,
  text: "BUTTON DEFAULT TEXT"
};

export default Title;

import React from "react";
import styles from "./styles";
import {View} from "native-base";
import PropTypes from 'prop-types';

const RoundedBorder = props => {
  const { color } = props;
  let extraStyles = {};
  if (color) {
    extraStyles.backgroundColor = color;
  }
  return (
    <View style={styles.container}>
      <View style={[styles.content, extraStyles]}></View>
    </View>
  );
};

RoundedBorder.propTypes = {
  color: PropTypes.string,
};


export default RoundedBorder;

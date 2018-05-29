import React from "react";
import styles from "./styles";
import {View} from "native-base";
import PropTypes from 'prop-types';

const RoundedBorder = props => {
  const { color, reversed } = props;
  let extraStyles = {};
  if (color) {
    extraStyles.backgroundColor = color;
  }
  if (reversed) {
    extraStyles.transform = [
      {rotateX: '180deg'},
      {scaleX: 1.8}
    ],
    extraStyles.marginTop = 0
  }
  return (
    <View style={styles.container}>
      <View style={[styles.content, extraStyles]}></View>
    </View>
  );
};

RoundedBorder.propTypes = {
  color: PropTypes.string,
  reversed: PropTypes.bool
};


export default RoundedBorder;

import React from "react";
import {Image} from "react-native";
const image = require('../../../assets/sweets.jpg');
import styles from './styles';

const BackgroundImage = () => (
  <Image source={image} style={styles.image} />
);

export default BackgroundImage;

import React from "React";
import {textStyles} from "../../../../config/fonts";
import PropTypes from "prop-types";
import { View, Icon, Text } from "native-base";
import styles from './styles';

const IconButton = props => {
  const { iconName, label, color } = props;
  return (
    <View style={styles.container}>
      <Icon name={iconName} style={styles.icon} />
      <Text style={textStyles.textStyle8}>{label}</Text>
      <View style={styles.separator} />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  )
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default IconButton;
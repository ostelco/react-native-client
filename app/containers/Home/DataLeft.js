import React from 'react';
import {TouchableOpacity} from "react-native";
import {textStyles} from "../../config/fonts";
import { View, Text, Body } from 'native-base';
import PropTypes from 'prop-types';

const DataLeft = props => {
  const { handlePress, value, label, style } = props;
  return (
    <Body>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={style.value}>{ value }</Text>
          <Text style={style.label}>{ label }</Text>
        </View>
      </TouchableOpacity>
    </Body>
  )
};

DataLeft.propTypes = {
  handlePress: PropTypes.func,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};

DataLeft.defaultProps = {
  style: {
    value: textStyles.textStyle12,
    label: textStyles.textStyle13
  }
};

export default DataLeft;

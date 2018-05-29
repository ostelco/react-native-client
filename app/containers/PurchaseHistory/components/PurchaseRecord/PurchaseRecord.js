import React from "react";
import styles from './styles';
import PropTypes from 'prop-types';
import {textStyles} from "../../../../config/fonts";
import { View, Text } from "native-base";

const PurchaseRecord = props => {
  const { title, description, priceLabel, containerStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyles.textStyle5}>{title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={textStyles.textStyle15}>{description}</Text>
        <Text style={textStyles.textStyle4}>{priceLabel}</Text>
      </View>
    </View>
  )
};

PurchaseRecord.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceLabel: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
};

PurchaseRecord.defaultProps = {
  containerStyle: {}
};

export default PurchaseRecord;
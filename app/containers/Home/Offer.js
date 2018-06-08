import React from 'react';
import {textStyles} from "../../config/fonts";

import { Body, View, Text } from 'native-base';
import {StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../config/colors";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  staticOfferContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  staticOfferButtonContainer: {
    width: 220,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  offerButton: {
    textAlign: 'center'
  },
});

const Offer = props => {
  const { productLabel, priceLabel, handlePress } = props;
  return (
    <Body style={styles.staticOfferContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.staticOfferButtonContainer}>
          <Text style={[textStyles.textStyle14, styles.offerButton]}>{productLabel}</Text>
          <Text style={[textStyles.textStyle15, styles.offerButton]}>{priceLabel}</Text>
        </View>
      </TouchableOpacity>
    </Body>
  );
};

Offer.propTypes = {
  priceLabel: PropTypes.string.isRequired,
  productLabel: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

Offer.defaultProps = {

};

export default Offer;

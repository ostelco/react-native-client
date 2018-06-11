import React from 'react';
import { Text, View, Icon } from 'native-base';
import {textStyles} from "../../config/fonts";
import {StyleSheet, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import {colors} from "../../config/colors";

const styles = StyleSheet.create({
  specialOfferContainer: {
    padding: 30
  },
  specialOffer: {
    width: '100%',
    height: 225,
    borderRadius: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  specialOfferButtonContainer: {
    width: 220,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  specialOfferButtonTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  emptyOfferIcon: {
    color: colors.rosa
  }
});

const SpecialOffer = props => {
  const { offerLabel, productLabel, priceLabel, productDescription, handlePress } = props;
  return (
    <View style={styles.specialOfferContainer}>
      <View style={styles.specialOffer}>
        <Text style={textStyles.textStyle8}>
          { offerLabel }
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.specialOfferButtonContainer}>
            <Text style={[textStyles.textStyle16, styles.offerButton]}>{productLabel}</Text>
            <Text style={[textStyles.textStyle17, styles.offerButton]}>{priceLabel}</Text>
          </View>
        </TouchableOpacity>
        <Text style={textStyles.textStyle18}>
          { productDescription }
        </Text>
      </View>
    </View>
  );
};

export const EmptySpecialOffer = props => {
  const { description, icon } = props;
  return (
    <View style={styles.specialOfferContainer}>
      <View style={styles.specialOffer}>
        <Text style={textStyles.textStyle8}>
          <Icon name={icon} style={styles.emptyOfferIcon} />
        </Text>
        <Text style={textStyles.textStyle18}>
          { description }
        </Text>
      </View>
    </View>
  )
};

EmptySpecialOffer.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};

EmptySpecialOffer.defaultProps = {
  description: 'Once we’ve learned a little bit more about you, you will find personalized offers here!',
  icon: "basket",
  style: styles
};

SpecialOffer.propTypes = {
  offerLabel: PropTypes.string.isRequired,
  productLabel: PropTypes.string.isRequired,
  priceLabel: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};

SpecialOffer.defaultProps = {
  style: styles
};

export default SpecialOffer;

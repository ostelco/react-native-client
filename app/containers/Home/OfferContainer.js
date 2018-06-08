import React from 'react';
import { compose, withProps, branch, renderNothing } from 'recompose';
import Offer from './Offer';

import PropTypes from 'prop-types';
import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import { selectProduct } from "../../actions";
import screens from "../../helper/screens";
import { withActions, withDefaultProduct, getProductLabel, getPriceLabel } from '../../helper/enhancers';

const OfferContainer = compose(
  withActions({ selectProduct }),
  withDefaultProduct,
  branch(({ product }) => product === undefined, renderNothing),
  withProps(({ product }) => {
    return ({
      productLabel: getProductLabel(product),
      priceLabel: getPriceLabel(product),
    })
  }),
  withNavigation,
  withProps(({ navigation, product, selectProduct }) => ({
    handlePress: () => {
      selectProduct(product);
      logAddToCartEvent(product);
      navigation.navigate(screens.Payment);
    }
  }))
)(Offer);

OfferContainer.propTypes = {
  sku: PropTypes.string.isRequired
};

export default OfferContainer;

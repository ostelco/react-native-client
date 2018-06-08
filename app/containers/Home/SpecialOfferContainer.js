import React from 'react';
import {compose, branch, renderComponent, withProps} from 'recompose';
import SpecialOffer from "./SpecialOffer";
import {withCustomProduct} from "../../helper/enhancers";
import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import { withActions, getOfferLabel, getProductLabel, getPriceLabel } from '../../helper/enhancers';
import { selectProduct } from '../../actions';
import screens from "../../helper/screens";
import { EmptySpecialOffer } from './SpecialOffer';

export default compose(
  withActions({ selectProduct }),
  withCustomProduct,
  branch(({ product }) => product === undefined, renderComponent(EmptySpecialOffer)),
  withProps(({ product }) => ({
    offerLabel: getOfferLabel(product),
    productLabel: getProductLabel(product),
    priceLabel: getPriceLabel(product)
  })),
  withNavigation,
  withProps(({ navigation, product, selectProduct }) => ({
    handlePress: () => {
      selectProduct(product);
      logAddToCartEvent(product);
      navigation.navigate(screens.Payment)
    }
  }))
)(SpecialOffer);

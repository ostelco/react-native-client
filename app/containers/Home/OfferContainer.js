import React from 'react';
import {compose, withProps, branch, renderNothing, renderComponent, mapProps} from 'recompose';
import Offer from './Offer';

import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import { selectProduct } from "../../actions";
import screens from "../../helper/screens";
import { withActions, withDefaultProduct, getProductSKU, getProductPrice, getProductCurrency } from '../../helper/enhancers';
import {getDefaultProductBySKU} from "../../helper/graphql";
import {formatPriceByPriceLabel} from "../../helper/price";
import {Query, withApollo, graphql} from "react-apollo";
import {Body, Text} from "native-base";

const OfferContainer = compose(
  withActions({ selectProduct }),
  withDefaultProduct,
  branch(({ product }) => product === undefined, renderNothing),
  withProps(({ product }) => {
    return ({
      sku: getProductSKU(product),
      price: getProductPrice(product),
      currency: getProductCurrency(product)
    })
  }),
  withNavigation,
  withProps(({ navigation, product, selectProduct }) => ({
    handlePress: () => {
      selectProduct(product);
      logAddToCartEvent(product);
      navigation.navigate(screens.Payment);
    }
  })),
  withApollo,
  graphql(getDefaultProductBySKU, {
    options: ({ sku }) => {
      return ({
        variables: {
          sku
        }
      })
    }
  }),
  branch(({ data }) => data.loading, renderNothing),
  branch(({ data }) => data.error, renderComponent(({ error }) => <Body style={{ alignItems: 'center' }}><Text>ERROR! {error}</Text></Body>)),
  withProps(({ data, price, currency }) => {
    const { productLabel } = data.DefaultProduct.translations[0];
    const { priceLabel } = data.DefaultProduct;
    return ({
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, price, currency),
    })
  })
)(Offer);

export default OfferContainer;

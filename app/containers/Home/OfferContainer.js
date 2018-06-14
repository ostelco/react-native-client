import React from 'react';
import {compose, withProps, branch, renderNothing, renderComponent} from 'recompose';
import Offer from './Offer';

import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import screens from "../../helper/screens";
import {getDefaultProductBySKU} from "../../helper/graphql";
import {formatPriceByPriceLabel} from "../../helper/price";
import {graphql} from "react-apollo";
import {Body, Text} from "native-base";
import {withDefaultProduct} from "../../helper/enhancers";

const OfferContainer = compose(
  /*
  withProps(() => {
    return ({
      sku: "1GB_249NOK" // TODO: Get this from somewhere else
    })
  }),
  */
  withDefaultProduct,
  graphql(getDefaultProductBySKU, {
    options: ({ product: { sku }}) => {
      return ({
        variables: {
          sku
        }
      })
    }
  }),
  branch(({ data: { loading } }) => loading, renderNothing),
  branch(({ data: { error } }) => error, renderComponent(({ data: { error }}) => <Body style={{ alignItems: 'center' }}><Text>ERROR! {error.message}</Text></Body>)),
  withProps(({ data, product: { price, sku } }) => {
    const { productLabel } = data.DefaultProduct.translations[0];
    const { priceLabel } = data.DefaultProduct;
    const { amount, currency } = price;
    return ({
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, amount, currency),
      amount,
      currency,
      sku,
    })
  }),
  withNavigation,
  withProps(({ navigation, sku, amount, currency, productLabel }) => ({
    handlePress: () => {
      logAddToCartEvent({ amount, currency, sku, label: productLabel, itemCategory: "default" });
      navigation.navigate(screens.Payment, { sku, itemCategory: "default" });
    }
  })),
)(Offer);

export default OfferContainer;

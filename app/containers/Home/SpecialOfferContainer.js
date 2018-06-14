import React from 'react';
import {compose, branch, renderComponent, withProps, renderNothing} from 'recompose';
import SpecialOffer from "./SpecialOffer";
import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import screens from "../../helper/screens";
import { EmptySpecialOffer } from './SpecialOffer';
import {formatPriceByPriceLabel} from "../../helper/price";
import {getOfferProductBySKU} from "../../helper/graphql";
import {graphql} from "react-apollo";
import {Body, Text} from "native-base";
import {withCustomProduct, withDefaultProduct} from "../../helper/enhancers";

export default compose(
  /*
  withProps(() => ({
    sku: "2GB_299NOK", // TODO: Get this from somewhere else
  })),
  */
  withCustomProduct,
  branch(({ product }) => !product, renderNothing),
  graphql(getOfferProductBySKU, {
    options: ({ product: { sku } }) => {
      return ({
        variables: {
          sku,
        }
      })
    }
  }),
  branch(({ data: { loading } }) => loading, renderComponent(EmptySpecialOffer)),
  branch(({ data: { error } }) => error, renderComponent(({ data: { error }}) => <Body style={{ alignItems: 'center' }}><Text>ERROR! {error.message}</Text></Body>)),
  withProps(({ data, product: { price, sku } }) => {
    const { offerLabel, productLabel, description } = data.OfferProduct.translations[0];
    const { priceLabel } = data.OfferProduct;
    const { amount, currency } = price;
    return ({
      offerLabel,
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, amount, currency),
      productDescription: description,
      amount,
      currency,
      sku,
    })
  }),
  withNavigation,
  withProps(({ navigation, sku, amount, currency, offerLabel }) => ({
    handlePress: () => {
      logAddToCartEvent({ amount, currency, sku, label: offerLabel, itemCategory: "special" });
      navigation.navigate(screens.Payment, { sku, itemCategory: "special" })
    }
  })),
)(SpecialOffer);

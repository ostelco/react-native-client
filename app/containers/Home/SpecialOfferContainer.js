import React from 'react';
import {compose, branch, renderComponent, withProps} from 'recompose';
import SpecialOffer from "./SpecialOffer";
import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import screens from "../../helper/screens";
import { EmptySpecialOffer } from './SpecialOffer';
import {formatPriceByPriceLabel} from "../../helper/price";
import {getOfferProductBySKU} from "../../helper/graphql";
import {graphql} from "react-apollo";
import {Body, Text} from "native-base";

export default compose(
  withProps(() => ({
    sku: "2GB_299NOK", // TODO: Get this from somewhere else
  })),
  graphql(getOfferProductBySKU, {
    options: ({ sku }) => {
      return ({
        variables: {
          sku
        }
      })
    }
  }),
  branch(({ data: { loading } }) => loading, renderComponent(EmptySpecialOffer)),
  branch(({ data: { error } }) => error, renderComponent(({ error }) => <Body style={{ alignItems: 'center' }}><Text>ERROR! {error}</Text></Body>)),
  withProps(({ data }) => {
    const { offerLabel, productLabel, description } = data.OfferProduct.translations[0];
    const { priceLabel, amount, currency } = data.OfferProduct;
    return ({
      offerLabel,
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, amount, currency),
      productDescription: description,
      amount,
      currency
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

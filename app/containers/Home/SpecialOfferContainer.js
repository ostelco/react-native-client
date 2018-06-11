import React from 'react';
import {compose, branch, renderComponent, withProps, mapProps} from 'recompose';
import SpecialOffer from "./SpecialOffer";
import {withActions, getProductCurrency, getProductPrice, getProductSKU, withCustomProduct} from "../../helper/enhancers";
import {withNavigation} from "react-navigation";
import {logAddToCartEvent} from "../../helper/analytics";
import { selectProduct } from '../../actions';
import screens from "../../helper/screens";
import { EmptySpecialOffer } from './SpecialOffer';
import {formatPriceByPriceLabel} from "../../helper/price";
import {getOfferProductBySKU} from "../../helper/graphql";
import {Query, withApollo, graphql} from "react-apollo";
import {Body, Text} from "native-base";

export default compose(
  withActions({ selectProduct }),
  withCustomProduct,
  branch(({ product }) => product === undefined, renderComponent(EmptySpecialOffer)),
  withProps(({ product }) => ({
    sku: getProductSKU(product),
    price: getProductPrice(product),
    currency: getProductCurrency(product)
  })),
  withNavigation,
  withProps(({ navigation, product, selectProduct }) => ({
    handlePress: () => {
      selectProduct(product);
      logAddToCartEvent(product);
      navigation.navigate(screens.Payment)
    }
  })),
  withApollo,
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
  mapProps(({ data, price, currency }) => {
    const { offerLabel, productLabel, description } = data.OfferProduct.translations[0];
    const { priceLabel } = data.OfferProduct;
    return ({
      offerLabel,
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, price, currency),
      productDescription: description,
    })
  })
)(SpecialOffer);

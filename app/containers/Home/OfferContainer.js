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
import {Query} from "react-apollo";
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
  }))
)(props => { // TODO: Create HOC of below, synchronize with some issue in SpecialOfferContainer
  const { sku, handlePress, price, currency } = props;
  return (
    <Query query={getDefaultProductBySKU} variables={{ sku }}>
      {compose(
        branch(({ loading }) => loading, renderNothing),
        branch(({ error }) => error, renderComponent(({ error }) => <Body style={{ alignItems: 'center' }}><Text>ERROR! {error}</Text></Body>)),
        mapProps(({ data }) => {
          const { productLabel } = data.DefaultProduct.translations[0];
          const { priceLabel } = data.DefaultProduct;
          return ({
            productLabel,
            priceLabel: formatPriceByPriceLabel(priceLabel, price, currency),
            handlePress,
          })
        })
      )(Offer)}
    </Query>
  )
});

export default OfferContainer;

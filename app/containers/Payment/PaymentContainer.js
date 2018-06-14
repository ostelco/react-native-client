import React from "react";
import Payment from "./Payment";
import { buyProduct } from "../../actions";
import {logECommercePurchaseEvent} from "../../helper/analytics";
import {compose, renderNothing, branch, withState, withProps} from 'recompose';
import {withActions, withDefaultProduct, withProductBySKU} from '../../helper/enhancers';
import {withNavigation} from "react-navigation";
import { graphql } from 'react-apollo';
import { getProduct } from '../../helper/graphql';
import {formatPriceByPriceLabel} from "../../helper/price";

export default compose(
  withActions({ buyProduct }),
  withNavigation,
  withProps(({ navigation }) => {
    return ({
      sku: navigation.getParam('sku'),
      itemCategory: navigation.getParam('itemCategory'),
    })
  }),
  withProductBySKU,
  branch(({ product }) => !product, renderNothing),
  graphql(getProduct, {
    options: ({ product: { sku }, navigation, itemCategory }) => {
      return ({
        variables: {
          sku,
          itemCategory,
        }
      })
    }
  }),
  branch(({ data: { loading } }) => loading, renderNothing),
  branch(({ data: { error } }) => error, renderNothing),
  withState('isDialogVisible', 'setIsDialogVisible', false),
  withProps((
    {
      data: { OfferProduct, DefaultProduct },
      navigation,
      setIsDialogVisible,
      buyProduct,
      itemCategory,
      product: { sku, price: { amount, currency }},
    }) => {
    const p = OfferProduct || DefaultProduct;
    const { productLabel } = p.translations[0];
    const { priceLabel } = p;
    return {
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, amount, currency),
      goBack: () => {
        setIsDialogVisible(false);
        navigation.pop()
      },
      confirm: () => {
        setIsDialogVisible(true);
        logECommercePurchaseEvent({ amount, currency, sku, productLabel, itemCategory });
        buyProduct(sku);
      }
    };
  }),
)(Payment);

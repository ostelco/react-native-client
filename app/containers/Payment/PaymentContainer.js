import React from "react";
import Payment from "./Payment";
import { buyProduct } from "../../actions";
import { connect } from 'react-redux';
import * as _ from "lodash";
import {logECommercePurchaseEvent} from "../../helper/analytics";
import {compose, renderNothing, branch, withState, withProps} from 'recompose';
import { withActions } from '../../helper/enhancers';
import {withNavigation} from "react-navigation";
import { graphql } from 'react-apollo';
import { getProduct } from '../../helper/graphql';
import {formatPriceByPriceLabel} from "../../helper/price";

export default compose(
  withActions({ buyProduct }),
  connect(({ selectedProduct }) => ({ selectedProduct })),
  withNavigation,
  graphql(getProduct, {
    options: ({ navigation }) => {
      return ({
        variables: {
          id: navigation.getParam('id')
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
      selectedProduct,
      navigation,
      setIsDialogVisible,
      buyProduct,
    }) => {
    const product = OfferProduct || DefaultProduct;
    const { productLabel } = product.translations[0];
    const { priceLabel } = product;
    const { price: { currency, amount }} = selectedProduct;
    return {
      productLabel,
      priceLabel: formatPriceByPriceLabel(priceLabel, amount, currency),
      goBack: () => {
        setIsDialogVisible(false);
        navigation.pop()
      },
      confirm: () => {
        setIsDialogVisible(true);
        logECommercePurchaseEvent(selectedProduct);
        buyProduct(selectedProduct.sku);
      }
    };
  }),
)(Payment);

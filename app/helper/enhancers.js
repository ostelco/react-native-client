import { branch, renderComponent, withProps } from "recompose";
import {connect} from "react-redux";
import * as _ from 'lodash';
import prettyBytes from "pretty-bytes";

export const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component)
  );

export const getTranslation = (propName, lang = 'EN_US') =>
  withProps(({ data }) => ({ presentationData: data[propName].translations.find(x => x.language === lang)}));

const _getProduct = (products, testFn) => Array.isArray(products.list) ? products.list.find(testFn) : undefined

export const getIsDefault = obj => _.get(obj, ['presentation', 'isDefault'], 'false');
export const getProductSKU = obj => _.get(obj, ['sku']);
export const getProductPrice = obj => _.get(obj, ['price', 'amount']);
export const getProductCurrency = obj => _.get(obj, ['price', 'currency']);
export const withProductBySKU = connect(
  ({ products }, { sku }) => {
    return ({
      product: _getProduct(products, p => p.sku === sku)
    })
  }
);

export const getDataLeft = obj => _.get(obj, ['status', 'remaining']);
export const formatBytes = bytes => isNaN(Number(bytes)) ? null : prettyBytes(bytes);

export const withDefaultProduct = connect(
  ({ products }) => {
    return ({
      product: _getProduct(products, p => getIsDefault(p) !== "false")
    })
  }
);

export const withCustomProduct = connect(
  ({ products, remoteConfig }) => {
    return ({
      product: _getProduct(products, p => p.sku === remoteConfig.productSku) || _getProduct(products, p => getIsDefault(p) === "false")
    })
  }
);

export const withSubscription = connect(
  ({ subscription }) => ({ subscription })
);

export const withProduct = connect(
  ({ products }, { sku }) => {
    return ({ product: Array.isArray(products.list) ? products.list.find(p => p.sku === sku) : undefined })
  }
);

export const withActions = actions => connect(null, actions);




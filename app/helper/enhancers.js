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

export const getIsDefault = obj => _.get(obj, ['presentation', 'isDefault'], 'false');
export const getProductLabel = obj => _.get(obj, ['presentation', 'productLabel']);
export const getPriceLabel = obj => _.get(obj, ['presentation', 'priceLabel'])

export const withDefaultProduct = connect(
  ({ products }) => {
    return ({
      product: Array.isArray(products.list) ? products.list.find(p => getIsDefault(p) !== "false") : undefined
    })
  }
);

export const withActions = actions => connect(null, actions);

export const withProduct = connect(
  ({ products }, { sku }) => {
    return ({ product: Array.isArray(products.list) ? products.list.find(p => p.sku === sku) : undefined })
  }
);

export const withSubscription = connect(
  ({ subscription }) => ({ subscription })
);

export const getDataLeft = obj => _.get(obj, ['status', 'remaining']);
export const formatBytes = bytes => isNaN(Number(bytes)) ? null : prettyBytes(bytes);

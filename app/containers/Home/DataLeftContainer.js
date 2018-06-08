import React from 'react';
import DataLeft from './DataLeft';

import { compose, mapProps, branch, renderNothing } from 'recompose';
import { withActions } from '../../helper/enhancers';
import { loadSubscription } from "../../actions";
import { withSubscription, formatBytes, getDataLeft } from "../../helper/enhancers";

export default compose(
  withActions({ loadSubscription }),
  withSubscription,
  mapProps(({ subscription, loadSubscription }) => ({
    value: formatBytes(getDataLeft(subscription)),
    label: 'data left',
    handlePress: loadSubscription
  })),
  branch(({ value }) => value === null, renderNothing)
)(DataLeft);

import React from "react";
import prettyBytes from "pretty-bytes";
import Home from "./Home";
import * as _ from "lodash";
import { connect } from 'react-redux';
import { loadProducts, selectProduct } from "../../actions";
import screens from "../../helper/screens";
import {logAddToCartEvent} from "../../helper/analytics";
import { Alert } from "react-native";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  _showMenu = () => {
    this.props.navigation.navigate(screens.Menu);
  };

  render() {
    if (this.props.subscription.queried === true && this.props.subscription.isFetching === false && this.props.subscription.status === null) {
      Alert.alert('We would not find your subscription:-(', 'The app will not work as expected. Please contact one of the friendly developers, we can fix it for you!');
    }

    return (
      <Home
        showMenu={this._showMenu}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { subscription } = state;
  return {
    subscription,
  };
};

export default connect(mapStateToProps, {

})(HomeContainer);

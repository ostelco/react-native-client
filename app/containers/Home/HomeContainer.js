import React from "react";
import Home, { HomeWithoutSubscription } from "./Home";
import screens from "../../helper/screens";
import {withSubscription} from "../../helper/enhancers";
import {compose, branch, renderComponent} from 'recompose';

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  _showMenu = () => {
    this.props.navigation.navigate(screens.Menu);
  };

  render() {
    return (
      <Home
        showMenu={this._showMenu}
      />
    );
  }
}

export default compose(
  withSubscription,
  branch(({ subscription }) => !subscription, renderComponent(HomeWithoutSubscription))
)(HomeContainer);

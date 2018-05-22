import React from "react";
import GDPR from "./GDPR";

class GDPRContainer extends React.Component {

  _showHome = () => {
    // TODO: Send consent true / false to server
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <GDPR cancel={this._showHome} confirm={this._showHome} />
    )
  }
}

export default GDPRContainer;

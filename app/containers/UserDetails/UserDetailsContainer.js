import React from "react";
import UserDetails from "./UserDetails";

class UserDetailsContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
        return (
          <UserDetails goBack={this._goBack} />
        )
    }
}
  
export default UserDetailsContainer;
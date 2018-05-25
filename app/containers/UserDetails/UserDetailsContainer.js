import React from "react";
import UserDetails from "./UserDetails";

class UserDetailsContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    render() {
        const profile = {
          name: 'Kerstin Kaspersen',
          email: 'kerstin@mail.com',
          street: 'Kongsvejen 17',
          postalCode: '1177',
          city: 'Oslo',
          country: 'Norway'
        };
        return (
          <UserDetails goBack={this._goBack} profile={profile} />
        )
    }
}
  
export default UserDetailsContainer;
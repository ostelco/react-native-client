import React from "react";
import UserDetails from "./UserDetails";

class UserDetailsContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.goBack()
    };

    _goEdit = (label, value, multiline = false) => {
      this.props.navigation.push('Edit', {
        label,
        value,
        multiline
      })
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
          <UserDetails goBack={this._goBack} profile={profile} goEdit={this._goEdit} />
        )
    }
}
  
export default UserDetailsContainer;
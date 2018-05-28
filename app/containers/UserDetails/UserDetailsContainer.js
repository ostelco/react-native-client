import React from "react";
import UserDetails from "./UserDetails";
import { connect } from 'react-redux';

class UserDetailsContainer extends React.Component {

    _goBack = () => {
        this.props.navigation.pop()
    };

    _goEdit = (label, profileKey, multiline = false) => {
      this.props.navigation.push('Edit', {
        label,
        profileKey,
        profile: this.props.profile,
        multiline
      })
    };

    render() {
        return (
          <UserDetails goBack={this._goBack} profile={this.props.profile} goEdit={this._goEdit} />
        )
    }
}

const mapStateToProps = (state) => {
  const { error, profile } = state;
  return {
    error,
    profile: profile.data
  };
};

export default connect(mapStateToProps)(UserDetailsContainer);

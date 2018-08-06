import React from 'react';
import {Icon, Text} from "native-base";
import {colors} from "../../config/colors";
import { Share, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Referral = (props) => {
  const { referralLink, name } = props;

  return (
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 12, backgroundColor: colors.rosa }} onPress={() => {
      Share.share({
        title: 'Share the love',
        message: `Hi there, just sending you the share link to the awesome service I mentioned.\n${name ? `Sincerely ${name}.` : '' }`,
        url: referralLink
      })
    }}>
      <Icon name="heart" style={{ color: colors.white }} />
      <Text style={{ color: colors.white }}>Invite a friend and they get</Text>
      <Text style={{ fontWeight: 'bold', color: colors.white }}>1GB</Text>
    </TouchableOpacity>
  )
};

Referral.propTypes = {
  referralLink: PropTypes.string.isRequired
};

export default Referral;
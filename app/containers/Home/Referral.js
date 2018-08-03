import React from 'react';
import {Icon, Text} from "native-base";
import {colors} from "../../config/colors";
import { Share, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Referral = (props) => {
  const { referralLink } = props;
  return (
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 12, backgroundColor: colors.rosa }} onPress={() => {
      Share.share({
        title: 'Title',
        message: `Content: ${referralLink}`,
        url: link
      })
    }}>
      <Icon name="heart" style={{ color: colors.white }} />
      <Text style={{ color: colors.white }}>Invite a friend and get you both</Text>
      <Text style={{ fontWeight: 'bold', color: colors.white }}>1GB</Text>
    </TouchableOpacity>
  )
};

Referral.propTypes = {
  referralLink: PropTypes.string.isRequired
};

export default Referral;
import React from 'react';
import {Body, Icon, Text} from "native-base";
import {colors} from "../../config/colors";
import { Share, TouchableOpacity } from 'react-native';
import { getReferralLink } from '../../helper/referral';

let link = '';

getReferralLink('1234').then(url => link = url);

const Referral = () => {
  return (
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 12, backgroundColor: colors.rosa }} onPress={() => {
      console.log('I clicked share', link);
      Share.share({
        title: 'Title',
        message: `Content: ${link}`,
        url: link
      })
    }}>
      <Icon name="heart" style={{ color: colors.white }} />
      <Text style={{ color: colors.white }}>Invite a friend and get you both</Text>
      <Text style={{ fontWeight: 'bold', color: colors.white }}>1GB</Text>
    </TouchableOpacity>
  )
};

export default Referral;
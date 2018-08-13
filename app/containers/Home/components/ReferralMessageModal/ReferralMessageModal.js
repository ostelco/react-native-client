import React from "react";
import {textStyles} from "../../../../config/fonts";
import Modal from "react-native-modal";
import { View, Text } from "native-base";
import { TouchableHighlight } from "react-native";
import { RNConfetti, RoundedBorder } from "../../../../components";
import styles from './styles';

const ReferralMessageModal = props => {
  const { isDialogVisible, itemDescription, goBack, style, closeButtonLabel } = props;
  return (
    <Modal isVisible={isDialogVisible} style={styles.modal}>
      <RoundedBorder reversed={true} />
      <View style={style.contentContainer}>
        <View style={style.content}>
          <Text style={textStyles.textStyle22}>Welcome to PI</Text>
          <View style={style.separator} />
          <Text style={textStyles.textStyle23}>Here's a gift for you</Text>
          <View style={style.description}>
            <Text style={textStyles.textStyle24}>{itemDescription}</Text>
          </View>
          <TouchableHighlight style={style.button} onPress={goBack}>
            <Text style={textStyles.textStyle6}>{closeButtonLabel}</Text>
          </TouchableHighlight>
        </View>
      </View>

      <RoundedBorder />

      <RNConfetti style={{ zIndex: 999 }} />
    </Modal>
  )
};

ReferralMessageModal.defaultProps = {
  style: styles
};

export default ReferralMessageModal;

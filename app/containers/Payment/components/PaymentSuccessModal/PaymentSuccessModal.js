import React from "react";
import {textStyles} from "../../../../config/fonts";
import Modal from "react-native-modal";
import { View, Text } from "native-base";
import { TouchableHighlight } from "react-native";
import { RNConfetti, RoundedBorder } from "../../../../components";
import styles from './styles';

const PaymentSuccessModal = props => {
  const { isDialogVisible, itemDescription, goBack, style } = props;
  return (
    <Modal isVisible={isDialogVisible} style={styles.modal}>
      <RoundedBorder reversed={true} />
      <View style={style.contentContainer}>
        <View style={style.content}>
          <Text style={textStyles.textStyle22}>Thank you</Text>
          <View style={style.separator} />
          <Text style={textStyles.textStyle23}>Enjoy your new</Text>
          <View style={style.description}>
            <Text style={textStyles.textStyle24}>{itemDescription}</Text>
          </View>
          <TouchableHighlight style={style.button} onPress={goBack}>
            <Text style={textStyles.textStyle6}>Ok</Text>
          </TouchableHighlight>
        </View>
      </View>

      <RoundedBorder />

      <RNConfetti />
    </Modal>
  )
};

PaymentSuccessModal.defaultProps = {
  style: styles
};

export default PaymentSuccessModal;

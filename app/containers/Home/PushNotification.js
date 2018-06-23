import React from 'react';

import {textStyles} from "../../config/fonts";
import { RNConfetti, RoundedBorder } from "../../components";
import Modal from "react-native-modal";
import { View, Text, Body, CheckBox, ListItem } from "native-base";
import { TouchableHighlight } from "react-native";

import {StyleSheet} from "react-native";
import {colors} from "../../config/colors";
import PropTypes from 'prop-types';
import { visualizeRender } from 'react-global-render-visualizer';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteTwo
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    zIndex: 1
  },
  headerLeftButton: {
    color: colors.brownishGrey
  },
  headerTitleContainer: {
    flex: 2
  },
  content: {
    flex: 1
  },
  productDescriptionContainer: {
    padding: 30,
    backgroundColor: colors.white,
    zIndex: 1
  },
  paymentFormContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 45,
    paddingTop: 75
  },
  row: {
    flexDirection: 'row'
  },
  firstColumn: {
    flex: 2,
    marginRight: 25
  },
  secondColumn: {
    flex: 1
  },
  firstColumnTextContainer: {
    marginBottom: 5
  },
  secondColumnTextContainer: {
    height: 60,
    backgroundColor: colors.white
  },
  leftPadding: {
    paddingLeft: 10
  },
  footer: {
    alignSelf: 'flex-end',
    paddingHorizontal: 45,
    width: '100%',
    paddingBottom: 25
  },
  submitButtonContainer: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    justifyContent: 'center'
  },
  modal: {
    margin: 0
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    zIndex: 1
  },
  content: {
    backgroundColor: colors.white,
    padding: 30
  },
  separator: {
    height: 10
  },
  description: {
    padding: 50
  },
  button: {
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.rosa,
    justifyContent: 'center'
  }
});

const PushNotification = props => {
  // console.log('---------------------------------------');
  // console.log('push notifications');
  const { style, checkboxValue, handleToggle, isVisible, isLoading, handleConfirm } = props;
  console.log('checkboxvalue', checkboxValue, 'render')
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <RoundedBorder reversed={true} />
      <View style={style.contentContainer}>
        <View style={style.content}>
          <Text style={textStyles.textStyle22}>Welcome to Pi</Text>
          <View style={style.separator} />
          <Text style={textStyles.textStyle23}>Here's a gift for you</Text>
          <View style={style.description}>
            <Text style={textStyles.textStyle24}>1GB</Text>
          </View>
          {isLoading ? (
            <ListItem>
              <CheckBox checked={checkboxValue} color={colors.rosa} disabled={true} />
              <Body>
              <Text>Notify me when I'm running low on data</Text>
              </Body>
            </ListItem>
          ) : (
            <ListItem onPress={() => { handleToggle(checkboxValue) }}>
              <CheckBox checked={checkboxValue} color={colors.rosa} disabled={true} />
              <Body>
              <Text>Notify me when I'm running low on data</Text>
              </Body>
            </ListItem>
          )}
          <TouchableHighlight style={style.button} onPress={handleConfirm}>
            <Text style={textStyles.textStyle6}>Ok</Text>
          </TouchableHighlight>
        </View>
      </View>

      <RoundedBorder />

      <RNConfetti style={{ zIndex: 999 }} />
    </Modal>
  )
};

PushNotification.propTypes = {
  style: PropTypes.object.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired
};

PushNotification.defaultProps = {
  style: styles
};

export default visualizeRender()(PushNotification);

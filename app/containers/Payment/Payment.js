import React from "react";
import {
  Container,
  Left,
  Icon,
  Body,
  Title,
  Text,
  Header,
  Content,
  View,
  Input
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import {StyleSheet, TouchableHighlight} from "react-native";
import { toolbarHeight, deviceWidth } from '../../config/variables';
import Modal from "react-native-modal";
import {RNConfetti} from "../../components";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // padding: 25,
    // paddingTop: 30,
    // paddingRight: 30,
    backgroundColor: null,
    // marginTop: 30
  },
  header: {
    backgroundColor: colors.white,

  },
  roundedBox: {
    // Make perfect circle
    width: deviceWidth,
    borderBottomRightRadius: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 2,
    height: deviceWidth,
    backgroundColor: colors.white,
    transform: [
      // Create oval by scaling X to get correct angle on border
      {scaleX: 1.8},
      // Expose bottom part of oval in the margin of the content between the header and content
      {translateY: toolbarHeight + 150}
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    marginTop: -deviceWidth
  },
  roundedBox2: {
    // Make perfect circle
    width: deviceWidth,
    borderBottomRightRadius: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 2,
    height: deviceWidth,
    backgroundColor: colors.white,
    transform: [
      // Create oval by scaling X to get correct angle on border
      {rotate: "180deg"},
      {scaleX: 1.8},
      // Expose bottom part of oval in the margin of the content between the header and content
      // {translateY: -deviceWidth - deviceHeight / 2 + 150},
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    // marginTop: -deviceWidth,
    position: 'absolute'
  },
  roundedBox3: {
    // Make perfect circle
    width: deviceWidth,
    borderBottomRightRadius: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 2,
    height: deviceWidth,
    backgroundColor: colors.white,
    transform: [
      // Create oval by scaling X to get correct angle on border
      {scaleX: 1.8},
      // Expose bottom part of oval in the margin of the content between the header and content
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    marginTop: -deviceWidth + 35
  }
});

const Payment = props => {
  const { style, goBack, confirm, isDialogVisible, price , itemDescription} = props;
  return (
    <Container style={{ position: 'relative', backgroundColor: colors.whiteTwo, overflow: 'hidden' }}>
      <View style={style.roundedBox}>
      </View>

      <Modal isVisible={isDialogVisible} style={{ margin: 0 }}>
        <View style={{height: 35, position: 'relative', overflow: 'hidden', width: '100%' }}>
          <View style={style.roundedBox2}></View>
        </View>

        <View style={{ width: '100%', justifyContent: 'center' }}>
          <View style={{ backgroundColor: colors.white, padding: 30 }}>
            <Text style={textStyles.textStyle22}>Thank you</Text>
            <View style={{ height: 10 }} />
            <Text style={textStyles.textStyle23}>Enjoy your new</Text>
            <View style={{ padding: 50 }}>
              <Text style={textStyles.textStyle24}>{itemDescription}</Text>
            </View>
            <TouchableHighlight style={{
              height: 60,
              borderRadius: 5,
              backgroundColor: colors.rosa,
              justifyContent: 'center'
            }} onPress={goBack}>
              <Text style={textStyles.textStyle6}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{ height: 35, overflow: 'hidden', width: '100%', zIndex: -1 }}>
          <View style={style.roundedBox3}>
          </View>
        </View>

        <RNConfetti />
      </Modal>

      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={[style.header, { position: 'relative', justifyContent: 'space-evenly' }]}>
        <Left style={{ flex: -1 }}>
          <Icon name="arrow-back" style={{ color: colors.brownishGrey }} onPress={goBack} />
        </Left>
        <Body style={{ alignItems: 'center', flex: 1 }}>
          <Title>
            <Text style={textStyles.textStyle19}>Purchase</Text>
          </Title>
        </Body>
      </Header>
      <Content contentContainerStyle={style.content} bounces={false}>
        <View style={{ padding: 30 }}>
          <Text style={textStyles.textStyle20}>{itemDescription}</Text>
          <Text style={textStyles.textStyle7}>{price.amount} {price.currency}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 45, paddingTop: 75 }}>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 2, marginRight: 25 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={textStyles.textStyle5}>Credit Card Number</Text>
              </View>
              <View style={{ height: 60, backgroundColor: colors.white, paddingLeft: 10 }}>
                <Input placeholder="**** **** **** ****" style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={textStyles.textStyle5}>Expires</Text>
              </View>
              <View style={{ height: 60, backgroundColor: colors.white }}>
                <Input placeholder="MM YY" style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row'  }}>
            <View style={{ flex: 2, marginRight: 25 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={textStyles.textStyle5}>Name on Card</Text>
              </View>
              <View style={{ height: 60, backgroundColor: colors.white, paddingLeft: 10 }}>
                <Input style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={textStyles.textStyle5}>CVV</Text>
              </View>
              <View style={{ height: 60, backgroundColor: colors.white }}>
                <Input placeholder="***" style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-end', paddingHorizontal: 45, width: '100%', paddingBottom: 75 }}>
          <View style={{
            width: '100%',
            height: 60,
            borderRadius: 5,
            backgroundColor: colors.rosa,
            justifyContent: 'center'
          }}>
            <TouchableHighlight onPress={confirm}>
              <Text style={textStyles.textStyle6}>{price.amount} {price.currency}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Content>
    </Container>
  )
};

Payment.propTypes = {
  style: PropTypes.object,
  goBack: PropTypes.func,
  confirm: PropTypes.func,
  isDialogVisible: PropTypes.bool
};

Payment.defaultProps = {
  style: styles
};

export default Payment;

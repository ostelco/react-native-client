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
  }
});

const Payment = props => {
  const { style, cancel, confirm } = props;
  return (
    <Container style={{ position: 'relative', backgroundColor: colors.whiteTwo, overflow: 'hidden' }}>
      <View style={style.roundedBox}>
      </View>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={[style.header, { position: 'relative', justifyContent: 'space-evenly' }]}>
        <Left style={{ flex: -1 }}>
          <Icon name="arrow-back" style={{ color: colors.brownishGrey }} onPress={cancel} />
        </Left>
        <Body style={{ alignItems: 'center', flex: 1 }}>
          <Title>
            <Text style={textStyles.textStyle19}>Purchase</Text>
          </Title>
        </Body>
      </Header>
      <Content contentContainerStyle={style.content} bounces={false}>
        <View style={{ padding: 30 }}>
          <Text style={textStyles.textStyle20}>1GB</Text>
          <Text style={textStyles.textStyle7}>25 NOK</Text>
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
              <Text style={textStyles.textStyle6}>Pay 25 NOK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Content>
    </Container>
  )
};

Payment.propTypes = {
  style: PropTypes.object,
  cancel: PropTypes.func,
  confirm: PropTypes.func,
};

Payment.defaultProps = {
  style: styles
};

export default Payment;

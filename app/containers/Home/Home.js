import React from "react";
import {
  Container,
  Icon,
  Body,
  Title,
  Text,
  Header,
  Content,
  List,
  ListItem,
  View,
  Right, Spinner
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import {StyleSheet, TouchableHighlight } from "react-native";
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
    backgroundColor: colors.rosa,

  },
  roundedBox: {
    // Make perfect circle
    width: deviceWidth,
    borderBottomRightRadius: deviceWidth / 2,
    borderBottomLeftRadius: deviceWidth / 2,
    height: deviceWidth,
    backgroundColor: colors.rosa,
    transform: [
      // Create oval by scaling X to get correct angle on border
      {scaleX: 1.8},
      // Expose bottom part of oval in the margin of the content between the header and content
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    marginTop: -deviceWidth + 35,
  }
});

const Home = props => {
  const { style, showMenu, showPayment, dataLeft, specialOffer } = props;
  return (
    <Container style={{ position: 'relative', backgroundColor: colors.whiteTwo }}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={[style.header, { position: 'relative', justifyContent: 'space-evenly' }]}>
        <Body style={{ alignItems: 'center', flex: 1 }}>
          <Title>
            <Text style={textStyles.textStyle11}>pi</Text>
          </Title>
        </Body>
        <Right style={{ flex: -1 }}>
          <Icon name="menu" style={{ color: colors.white }} onPress={showMenu} />
        </Right>
      </Header>
      <Content contentContainerStyle={style.content} bounces={false}>
        <List style={{ backgroundColor: colors.rosa }}>
          <ListItem noBorder>
            { dataLeft ? (
              <Body>
                <Text style={textStyles.textStyle12}>
                  { dataLeft }
                </Text>
                <Text style={textStyles.textStyle13}>Left</Text>
              </Body>
              ) : <Body><Spinner color="white" /></Body>}
          </ListItem>
          <ListItem noBorder onPress={showPayment}>
            <Body style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <View style={{
                width: 220,
                height: 60,
                borderRadius: 5,
                paddingHorizontal: 40,
                backgroundColor: colors.white,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}>
                  <Text style={[textStyles.textStyle14, { textAlign: 'center' }]}>+2GB</Text>
                  <Text style={[textStyles.textStyle15, { textAlign: 'center' }]}>40 NOK</Text>
              </View>
            </Body>
          </ListItem>
        </List>
        <View style={{ height: 35, overflow: 'hidden', width: '100%', zIndex: -1 }}>
          <View style={style.roundedBox}>
          </View>
        </View>
        { specialOffer ? (
          <View style={{
            padding: 30
          }}>
            <View style={{
              width: '100%',
              height: 225,
              borderRadius: 5,
              backgroundColor: colors.white,
              paddingHorizontal: 30,
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}>
              <Text style={textStyles.textStyle8}>
                Monday Special!
              </Text>
              <TouchableHighlight onPress={showPayment}>
                <View style={{
                  width: 220,
                  height: 60,
                  borderRadius: 5,
                  backgroundColor: colors.rosa,
                  paddingHorizontal: 40,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[textStyles.textStyle16, { textAlign: 'center' }]}>+2GB</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[textStyles.textStyle17, { textAlign: 'center' }]}>25 NOK</Text>
                  </View>
                </View>
              </TouchableHighlight>
              <Text style={textStyles.textStyle18}>
                Lorem ipsum dolor sit amet, consec tetur dipiscing elit lorum ipsum…
              </Text>
            </View>
          </View>
        ) : null}
      </Content>
    </Container>
  )
};

Home.propTypes = {
  style: PropTypes.object,
  showMenu: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  dataLeft: PropTypes.string,
  specialOffer: PropTypes.object
};

Home.defaultProps = {
  style: styles,
};

export default Home;

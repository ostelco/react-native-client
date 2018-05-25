import React from "react";
import {Container, Left, Button, Icon, Body, Title, Text, Header, Content, List, ListItem, View} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import {StyleSheet} from "react-native";
import { toolbarHeight, deviceWidth } from '../../config/variables';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    paddingRight: 30,
    backgroundColor: colors.whiteTwo,
    marginTop: 30
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
      {translateY: toolbarHeight + 30}
    ],
    // Make so shape does not occupy any space on the screen, use translate to position it where it's wanted
    marginTop: -deviceWidth
  }
});

const GDPR = props => {
  const { style, confirm, consent} = props;
  return (
    <Container style={{ position: 'relative', backgroundColor: colors.whiteTwo }}>
      <View style={style.roundedBox} />
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={[style.header, { position: 'relative' }]}>
        <Body>
          <Title>
            <Text style={textStyles.textStyle10}>pi</Text>
          </Title>
        </Body>
      </Header>
      <Content contentContainerStyle={style.content}>
        <List style={{ flex: 1 }}>
          <ListItem noBorder>
          <Text style={textStyles.textStyle7}>
              In order to give you offers that fit your needs, you need to agree to let us: { consent ? ' ' + consent.description : ''}
            </Text>
          </ListItem>
          <ListItem noBorder>
            <Body>
            <Icon name="basket" style={{ textAlign: 'center' }} />
            </Body>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle7}>
              In order to give you offers that fit your needs, you need to agree to let us:
            </Text>
          </ListItem>
        </List>
        <List style={{ flex: -1, width: '100%' }}>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, false)}>
            <Body style={{
              flex: 1,
              justifyContent: 'center',
              height: 60,
              borderRadius: 5,
              backgroundColor: colors.white }}>
              <Text style={textStyles.textStyle8}>No thanks</Text>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, true)}>
            <Body style={{
              flex: 1,
              justifyContent: 'center',
              height: 60,
              borderRadius: 5,
              backgroundColor: colors.rosa }}>
            <Text style={textStyles.textStyle6}>Yes, I agree</Text>
            </Body>
          </ListItem>
          <ListItem noBorder>
            <Body style={{
              flex: 1,
              justifyContent: 'center'
            }}>
              <Text style={textStyles.textStyle9}>
                You can change this in the Privacy Settings later.
              </Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
};

GDPR.propTypes = {
  style: PropTypes.object,
  consent: PropTypes.object,
  confirm: PropTypes.func.isRequired
};

GDPR.defaultProps = {
  style: styles
};

export default GDPR;

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

const TermsAndConditions = props => {
  const { style, goBack } = props;
  return (
    <Container style={{ position: 'relative', backgroundColor: colors.whiteTwo }}>
      <View style={style.roundedBox} />
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={[style.header, { position: 'relative' }]}>
        <Left>
          <Button transparent onPress={goBack}>
            {/* <Icon name="arrow-back" style={{ color: colors.brownishGrey }} /> */}
          </Button>
        </Left>
        <Body>
          <Title>
            <Text style={textStyles.textStyle19}>Terms & Conditions</Text>
          </Title>
        </Body>
      </Header>
      <Content contentContainerStyle={style.content}>
        <List>
          <ListItem noBorder>
            <Text style={textStyles.textStyle5}>5 May 2018</Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec nibh justo. Fusce interdum tellus sit amet augue eleifend, in porttitor nulla scelerisque.
            </Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>
              Duis nec nibh justo. Fusce interdum tellus sit amet augue eleifend, in porttitor nulla scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
};

TermsAndConditions.propTypes = {
  style: PropTypes.object,
  goBack: PropTypes.func.isRequired
};

TermsAndConditions.defaultProps = {
  style: styles
};

export default TermsAndConditions;

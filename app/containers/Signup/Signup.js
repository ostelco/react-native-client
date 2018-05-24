import React from "react";
import {ScreenTitle } from "../../components";
import {Container, Body, Left, Button, Icon, Content, Form, Item, Label, Input, Header} from "native-base";
import {colors} from "../../config/colors";
import {textStyles} from "../../config/fonts";
import {Image, StyleSheet, Text, View} from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
  }
});

const FormItem = props => {
  const { children } = props;
  return (
    <Item {...props} style={{
      height: 60,
      marginVertical: 8,
      paddingLeft: 19,
      paddingRight: 15,
      borderRadius: 5,
      backgroundColor: colors.white
    }}>
      {children}
    </Item>
  )
};

const AppLabel = props => {
  const { children } = props;
  return (
    <Label style={textStyles.textStyle5}>
      {children}
    </Label>
  )
};

const AppInput = props => (
  <Input style={textStyles.textStyle4} {...props} />
);

const Signup = props => {
  const { style, goBack, showNext, profile } = props;

  return (
    <Container>
      <Image source={require('../../../assets/sweets.jpg')} style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
        <Header androidStatusBarColor={'rgba(0,0,0,0.5)'} style={{ backgroundColor: 'transparent' }} noShadow>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <ScreenTitle text={'Personal details'} />
        </Body>
      </Header>
      <Content contentContainerStyle={style.content}>
        <Form>
          <FormItem fixedLabel>
            <AppLabel>Full Name</AppLabel>
            <AppInput value={profile.name} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>Address</AppLabel>
            <AppInput value={'Storvej 10'} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>Postal Code</AppLabel>
            <AppInput value={'132 23'} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>City</AppLabel>
            <AppInput value={'Oslo'} />
          </FormItem>
          <View style={{ paddingLeft: 15 }}>
            <Button onPress={showNext} style={{ height: 60,
              marginVertical: 8,
              borderRadius: 5,
              backgroundColor: colors.duskBlue }} block><Text style={textStyles.textStyle6}>Done</Text></Button>
          </View>

        </Form>
      </Content>
    </Container>
  )
};

Signup.propTypes = {
  style: PropTypes.object,
  goBack: PropTypes.func,
  showNext: PropTypes.func,
  profile: PropTypes.object
};

Signup.defaultProps = {
  style: styles,
  profile: {
    name: 'David Berg'
  }
};

export default Signup;

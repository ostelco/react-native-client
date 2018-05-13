import React from "react";
import { AppHeader, ScreenTitle } from "../../components";
import {Container, Body, Left, Button, Icon, Content, Form, Item, Label, Input} from "native-base";
import {colors} from "../../config/colors";
import {textStyles} from "../../config/fonts";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    paddingRight: 30,
    backgroundColor: colors.rosa,
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
  const { style, goBack, showNext } = props;
  return (
    <Container>
      <AppHeader>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <ScreenTitle text={'Personal details'} />
        </Body>
      </AppHeader>
      <Content contentContainerStyle={style.content}>
        <Form>
          <FormItem fixedLabel>
            <AppLabel>Full Name</AppLabel>
            <AppInput value={'David Berg'} />
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
  showNext: PropTypes.func
};

Signup.defaultProps = {
  style: styles
};

export default Signup;

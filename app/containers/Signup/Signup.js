import React from "react";
import {BackgroundImage } from "../../components";
import {Container, Body, Left, Button, Icon, Content, Form, Item, Label, Input, Header, Title, Right} from "native-base";
import {textStyles} from "../../config/fonts";
import {Text, View} from "react-native";
import PropTypes from 'prop-types';
import styles from './styles';

const FormItem = props => {
  const { children } = props;
  return (
    <Item {...props} style={styles.formItem}>
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
  const {
    goBack,
    showNext,
    profile,
    handleNameChange,
    handleAddressChange,
    handlePostCodeChange,
    handleCityChange,
  } = props;

  return (
    <Container>
      <BackgroundImage />
      <Header androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header} noShadow>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon style={styles.headerLeftButton} name="arrow-back" />
          </Button>
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle3}>Personal details</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <Form>
          <FormItem fixedLabel>
            <AppLabel>Full Name</AppLabel>
            <AppInput value={profile.name} onChangeText={handleNameChange} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>Address</AppLabel>
            <AppInput value={profile.address} onChangeText={handleAddressChange} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>Postal Code</AppLabel>
            <AppInput value={profile.postCode} onChangeText={handlePostCodeChange} />
          </FormItem>
          <FormItem fixedLabel>
            <AppLabel>City</AppLabel>
            <AppInput value={profile.city}  onChangeText={handleCityChange} />
          </FormItem>
          <View style={styles.doneButtonContainer}>
            <Button onPress={showNext} style={styles.doneButton} block><Text style={textStyles.textStyle6}>Done</Text></Button>
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
  profile: {
    name: 'David Berg'
  }
};

export default Signup;

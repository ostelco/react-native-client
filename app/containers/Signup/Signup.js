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
    handleChange,
    presentationData
  } = props;

  const fields = [];
  const { title, doneButton } = presentationData;
  for (let i = 0; i < presentationData.fields.length; ++i) {
    const { label, key } = presentationData.fields[i];
    fields.push((
      <FormItem fixedLabel>
        <AppLabel>{ label }</AppLabel>
        <AppInput value={profile[key]} onChangeText={handleChange(key)} />
      </FormItem>
    ))
  }
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
          <Title style={textStyles.textStyle3}>{ title }</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <Form>
          { fields }
          <View style={styles.doneButtonContainer}>
            <Button onPress={showNext} style={styles.doneButton} block><Text style={textStyles.textStyle6}>{ doneButton }</Text></Button>
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

export default Signup;

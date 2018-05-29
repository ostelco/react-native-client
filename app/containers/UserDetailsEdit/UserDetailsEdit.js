import React from "react";
import {Container, Header, Body, Title, Content, Form, Item, Label, Input, Footer, FooterTab, Button, Text} from "native-base";
import styles from './styles';
import {textStyles} from "../../config/fonts";
import PropTypes from 'prop-types';

const UserDetailsEdit = props => {
  const { label, value, onCancel, onSubmit, onChangeText, multiline } = props;
  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Body>
        <Title>Edit</Title>
        </Body>
      </Header>
      <Content style={styles.contentContainer}>
        <Form>
          <Label style={textStyles.textStyle5}>{label}</Label>
          <Item rounded>
            <Input
              style={textStyles.textStyle15}
              value={value}
              multiline={multiline}
              onChangeText={onChangeText}
            />
          </Item>
        </Form>
      </Content>
      <Footer style={styles.footer}>
        <FooterTab>
          <Button style={[styles.footerButton, styles.cancelButton]} onPress={onCancel}>
            <Text style={textStyles.textStyle8}>Cancel</Text>
          </Button>
          <Button style={[styles.footerButton, styles.submitButton]} onPress={onSubmit}>
            <Text style={textStyles.textStyle6}>Save</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

UserDetailsEdit.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  multiline: PropTypes.bool
};

export default UserDetailsEdit;

import React from "react";
import {Container, Icon, Body, Title, Text, Header, Content, List, ListItem} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import styles from './styles';
import {RoundedBorder} from "../../components";

const GDPR = props => {
  const { confirm, consent} = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Body>
          <Title style={textStyles.textStyle10}>
            Red Otter
          </Title>
        </Body>
      </Header>
      <RoundedBorder />
      <Content contentContainerStyle={styles.content}>
        <List style={styles.list}>
          <ListItem noBorder>
          <Text style={textStyles.textStyle7}>
              In order to give you offers that fit your needs, you need to agree to let us: { consent ? ' ' + consent.description : ''}
            </Text>
          </ListItem>
          <ListItem noBorder>
            <Body>
            <Icon name="basket" style={styles.icon} />
            </Body>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle7}>
              In order to give you offers that fit your needs, you need to agree to let us:
            </Text>
          </ListItem>
        </List>
        <List style={styles.footer}>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, false)}>
            <Body style={styles.cancelButton}>
              <Text style={textStyles.textStyle8}>No thanks</Text>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, true)}>
            <Body style={styles.acceptButton}>
            <Text style={textStyles.textStyle6}>Yes, I agree</Text>
            </Body>
          </ListItem>
          <ListItem noBorder>
            <Body style={styles.privacyTextContainer}>
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

export default GDPR;

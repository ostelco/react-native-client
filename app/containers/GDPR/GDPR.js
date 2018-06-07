import React from "react";
import {Container, Icon, Body, Title, Text, Header, Content, List, ListItem} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import styles from './styles';
import {RoundedBorder} from "../../components";

const GDPR = props => {
  const { confirm, consent, presentationData } = props;
  const { title, description, confirmButtonText, denyButtonText, privacyText, consents } = presentationData;
  const consentList = [];
  for (let i = 0; i < consents.length; ++i) {
    const { icon, description, id } = consents[i];
    consentList.push((
      <ListItem noBorder key={`${id}-icon`}>
        <Body>
        <Icon name={icon} style={styles.icon} />
        </Body>
      </ListItem>
    ));
    consentList.push((
      <ListItem noBorder key={`${id}-description`}>
        <Text style={textStyles.textStyle7}>
          {description}
        </Text>
      </ListItem>
    ));
  }
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Body>
          <Title style={textStyles.textStyle10}>
            { title }
          </Title>
        </Body>
      </Header>
      <RoundedBorder />
      <Content contentContainerStyle={styles.content}>
        <List style={styles.list}>
          <ListItem noBorder>
          <Text style={textStyles.textStyle7}>
            { description }: { consent ? ' ' + consent.description : ''}
            </Text>
          </ListItem>
          {consentList}
        </List>
        <List style={styles.footer}>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, false)}>
            <Body style={styles.cancelButton}>
              <Text style={textStyles.textStyle8}>{denyButtonText}</Text>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={() => confirm(consent.consentId, true)}>
            <Body style={styles.acceptButton}>
            <Text style={textStyles.textStyle6}>{confirmButtonText}</Text>
            </Body>
          </ListItem>
          <ListItem noBorder>
            <Body style={styles.privacyTextContainer}>
              <Text style={textStyles.textStyle9}>
                {privacyText}
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

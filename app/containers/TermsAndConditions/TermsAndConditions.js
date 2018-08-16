import React from "react";
import {Container, Left, Button, Icon, Body, Title, Text, Header, Content, List, ListItem, View, Right} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import styles from './styles';
import {RoundedBorder, AppHeaderWhite} from "../../components";


const TermsAndConditions = props => {
  const { goBack, isModal } = props;
  return (
    <Container style={styles.container}>
      <AppHeaderWhite>
        <Left style={{ flex: 1, alignItems: 'stretch' }}>
          {isModal ? null : (
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerButton}/>
            </Button>
          )}
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>
            Terms
          </Title>
        </Body>
        <Right>
          {isModal ? (
            <Button transparent onPress={goBack}>
              <Icon name="close" style={styles.headerButton}/>
            </Button>
          ) : null}
        </Right>
      </AppHeaderWhite>
      <Content contentContainerStyle={styles.content}>
        <RoundedBorder />
        <List>
          <ListItem noBorder>
            <Text style={textStyles.textStyle5}>5 May 2018</Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>
              Information you give us. For example, many of our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number or credit card to store with you account. If you want to take full advantage of the sharing feature we offer, we might also ask you to create a publicly visible profile, which may include your name and photo.
            </Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>
              Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you watch a video, visit a website that uses our advertising services, or view and interact with our ads and content.
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
};

TermsAndConditions.propTypes = {
  goBack: PropTypes.func.isRequired,
  isModal: PropTypes.bool
};

TermsAndConditions.defaultProps = {
  isModal: true
}

export default TermsAndConditions;

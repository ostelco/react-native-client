import React from "react";
import {Container, Left, Button, Icon, Body, Title, Text, Header, Content, List, ListItem, View, Right} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import styles from './styles';
import {RoundedBorder} from "../../components";


const TermsAndConditions = props => {
  const { goBack } = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="arrow-back" style={styles.headerLeftButton} />
          </Button>
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>
            Terms & Conditions
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <RoundedBorder />
      <Content contentContainerStyle={styles.content}>
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
  goBack: PropTypes.func.isRequired
};

export default TermsAndConditions;

import {Body, Container, Content, List, ListItem, Text, Button, View, Icon, Header, Title} from "native-base";
import React from "react";
import {colors} from "../..//config/colors";
import PropTypes from 'prop-types';
import { Image } from "react-native";
import styles from './styles';
import {textStyles} from "../../config/fonts";

const OnBoarding = (props) => {

  const { showTermsAndConditions, signIn, presentationData } = props;

  const { title, description, termsAndConditionsLabel, signInButton } = presentationData;

  return (
    <Container>
      <Image source={require('../../../assets/sweets.jpg')} style={styles.containerImage} />
      <Header androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header} noShadow>
        <Body style={{ alignItems: 'center' }}>
          <Title style={textStyles.textStyle11}>{ title }</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={styles.contentContainer}>

        <View style={styles.textContainer}>
          <Text style={textStyles.textStyle}>{ description }</Text>
        </View>

        <List style={styles.footerContainer}>
          <ListItem noBorder>
            <Body>
              <Button block onPress={signIn} style={styles.signInButton}>
                <Icon name="logo-google" style={styles.signInButtonIcon} />
                <Text style={styles.signInButtonText}>{ signInButton }</Text>
              </Button>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={showTermsAndConditions}>
            <Body>
              <Text style={textStyles.textStyle2}>{ termsAndConditionsLabel }</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

OnBoarding.propTypes = {
  showTermsAndConditions: PropTypes.func,
  signIn: PropTypes.func,
  presentationData: PropTypes.object.isRequired
};

export default OnBoarding;

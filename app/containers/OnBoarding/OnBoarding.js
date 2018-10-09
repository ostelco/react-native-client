import {Body, Container, Content, List, ListItem, Text, Button, View, Icon, Header, Title} from "native-base";
import React from "react";
import PropTypes from 'prop-types';
import {Image} from "react-native";
import styles from './styles';
import {textStyles} from "../../config/fonts";
import { AppVersion } from "../../components";

const OnBoarding = (props) => {
  console.log('render onboarding');
  const { showTermsAndConditions, signIn, style, textStyles, androidStatusBarColor, loginButtonLabel, termsAndConditionsLabel, onBoardingDescriptionLabel, loginButtonIconName, title } = props;
  return (
    <Container>
      <Image source={require('../../../assets/bg.png')} style={style.containerImage} />
      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
        <AppVersion />
      </View>
      <Content contentContainerStyle={style.contentContainer}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Image source={require('../../../assets/logo.png')} />
          <View style={style.textContainer}>
            <Text style={textStyles.textStyle}>{onBoardingDescriptionLabel}</Text>
          </View>
        </View>
        <List style={style.footerContainer}>
          <ListItem noBorder>
            <Body>
              <Button block onPress={signIn} style={style.signInButton}>
                <Icon name={loginButtonIconName} style={style.signInButtonIcon} />
                <Text style={style.signInButtonText}>{loginButtonLabel}</Text>
              </Button>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={showTermsAndConditions}>
            <Body>
              <Text style={textStyles.textStyle2}>{termsAndConditionsLabel}</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

OnBoarding.propTypes = {
  androidStatusBarColor: PropTypes.string.isRequired,
  loginButtonIconName: PropTypes.string.isRequired,
  loginButtonLabel: PropTypes.string.isRequired,
  onBoardingDescriptionLabel: PropTypes.string.isRequired,
  showTermsAndConditions: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  style: PropTypes.any.isRequired,
  termsAndConditionsLabel: PropTypes.string.isRequired,
  textStyles: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

OnBoarding.defaultProps = {
  androidStatusBarColor: 'rgba(0,0,0,0.5)',
  style: styles,
  textStyles,
};

export default OnBoarding;

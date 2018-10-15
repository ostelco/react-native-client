import {Body, Container, Content, List, ListItem, Text, Button, View, Icon, Header, Title} from "native-base";
import React from "react";
import PropTypes from 'prop-types';
import {Image} from "react-native";
import styles from './styles';
import {textStyles} from "../../config/fonts";
import { AppVersion } from "../../components";
import {TermsAndConditionsLinkAsListItemContainer} from "../../components/ExternalLink/ExternalLink";

const OnBoarding = (props) => {
  console.log('render onboarding');
  const { showTermsAndConditions, signIn, style, textStyles, androidStatusBarColor, loginButtonLabel, termsAndConditionsLabel, onBoardingDescriptionLabel, loginButtonIconName, title } = props;
  return (
    <Container>
      <Image source={require('../../../assets/sweets.jpg')} style={style.containerImage} />
      <Header androidStatusBarColor={androidStatusBarColor} style={style.header} noShadow>
        <Body style={style.headerContent}>
          <Title style={textStyles.textStyle11}>{title} <AppVersion /> </Title>
        </Body>
      </Header>
      <Content contentContainerStyle={style.contentContainer}>
        <View style={style.textContainer}>
          <Text style={textStyles.textStyle}>{onBoardingDescriptionLabel}</Text>
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
          <TermsAndConditionsLinkAsListItemContainer />
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
  textStyles: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

OnBoarding.defaultProps = {
  androidStatusBarColor: 'rgba(0,0,0,0.5)',
  style: styles,
  textStyles,
};

export default OnBoarding;

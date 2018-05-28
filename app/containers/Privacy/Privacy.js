import React from "react";
import {Container, Body, Left, Title, Right, Text, Button, Icon, Content, Header, View} from "native-base";
import styles from './styles';
import {RoundedBorder} from "../../components";
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import { Switch, TouchableHighlight } from "react-native";

const Privacy = props => {
    const { goBack,  showPrivacyPolicy, showTermsAndConditions, consent, setConsent} = props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerLeftButton} />
            </Button>
          </Left>
          <Body style={styles.headerTitleContainer}>
            <Title style={textStyles.textStyle19}>Privacy</Title>
          </Body>
          <Right></Right>
        </Header>
        <RoundedBorder />
        <Content style={styles.content}>
          <View style={styles.consentContainer}>
            <Text style={textStyles.textStyle5}>Personalized Offer</Text>
            <Switch value={consent.accepted} onTintColor={colors.rosa}
                    onValueChange={(value) => {setConsent(consent.consentId, value)}}
            />
          </View>
          <View style={styles.separator} />
          <Text style={textStyles.textStyle15}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec nibh justo. Fusce interdum tellus sit amet augue eleifend, in porttitor nulla scelerisque.
          </Text>
          <View style={styles.linkButtonContainer}>
            <TouchableHighlight onPress={showPrivacyPolicy}>
              <View style={styles.linkButton}>
                <Text style={textStyles.textStyle26}>Privacy Policy</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={showTermsAndConditions}>
              <View style={styles.linkButton}>
                <Text style={textStyles.textStyle26}>Terms & Conditions</Text>
              </View>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
};

export default Privacy;
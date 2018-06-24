import React from "react";
import {Container, Body, Left, Title, Text, Button, Icon, Content, Header, Right, View, Footer} from "native-base";
import {textStyles} from "../../config/fonts";
import styles from "./styles";
import {colors} from "../../config/colors";
import { RoundedBorder } from "../../components";
import {TouchableHighlight} from "react-native";
import { IconButton } from './components';
import { version } from '../../../package';

const Settings = props => {
  const { goBack, showUserDetails, handleLogout, showPrivacy, showPurchaseHistory, handleShowSignUp, handleFeedback } = props;
  return (
    <Container style={styles.container}>
      <Header style={styles.header} androidStatusBarColor={'rgba(0,0,0,0.5)'} noShadow>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name="arrow-back" style={styles.headerLeftButton} />
          </Button>
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>Menu</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <View style={styles.topButtonContainer}>
          <TouchableHighlight onPress={showUserDetails} style={styles.flex}>
            <IconButton iconName="person" label="Personal details" color={colors.rosa} />
          </TouchableHighlight>
          <TouchableHighlight onPress={showPrivacy} style={styles.flex}>
            <IconButton iconName="shirt" label="Privacy" color={colors.duskBlue} />
          </TouchableHighlight>
        </View>
        <RoundedBorder />
        <View style={styles.bottomButtonContainer}>
          <TouchableHighlight onPress={showPurchaseHistory}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>What You Bought</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleLogout}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>Logout</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleShowSignUp}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>Sign Up Flow</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleFeedback}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>Report a problem</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>version: {version}</Text>
      </Footer>
    </Container>
  );
}

export default Settings;
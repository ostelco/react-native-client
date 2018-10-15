import React from "react";
import {Container, Body, Left, Title, Text, Button, Icon, Content, Header, Right, View, Footer} from "native-base";
import {textStyles} from "../../config/fonts";
import styles from "./styles";
import {colors} from "../../config/colors";
import { RoundedBorder, OnlyInDebugMode } from "../../components";
import {TouchableOpacity} from "react-native";
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
          <TouchableOpacity onPress={showUserDetails} style={styles.flex}>
            <IconButton iconName="person" label="Personal details" color={colors.rosa} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showPrivacy} style={styles.flex}>
            <IconButton iconName="shirt" label="Privacy" color={colors.duskBlue} />
          </TouchableOpacity>
        </View>
        <RoundedBorder />
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity onPress={showPurchaseHistory}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>What You Bought</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>Logout</Text>
            </View>
          </TouchableOpacity>
          <OnlyInDebugMode>
            <TouchableOpacity onPress={handleShowSignUp}>
              <View style={styles.bottomButton}>
                <Text style={textStyles.textStyle8}>Sign Up Flow</Text>
              </View>
            </TouchableOpacity>
          </OnlyInDebugMode>
          <TouchableOpacity onPress={handleFeedback}>
            <View style={styles.bottomButton}>
              <Text style={textStyles.textStyle8}>Report a problem</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>version: {version}</Text>
      </Footer>
    </Container>
  );
}

export default Settings;
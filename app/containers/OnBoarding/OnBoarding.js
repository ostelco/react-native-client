import {Body, Container, Content, List, ListItem, Text, Button, View, Icon, Header} from "native-base";
import React from "react";
import {AppTitle, AppHeader} from '../../components';
import {colors} from "../..//config/colors";
import PropTypes from 'prop-types';
import {Image} from "react-native";

// TODO: Move styles to stylesheet

const OnBoarding = (props) => {
  const { showTermsAndConditions, signIn } = props;
  return (
    <Container>
      <Image source={require('../../../assets/sweets.jpg')} style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
      <Header androidStatusBarColor={'rgba(0,0,0,0.5)'} style={{ backgroundColor: 'transparent' }} noShadow>
        <Body style={{ alignItems: 'center'}}>
          <AppTitle text={'pi'} />
        </Body>
      </Header>
      <Content contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 80, paddingBottom: 30, paddingHorizontal: 30, justifyContent: 'space-between' }}>

        <Text style={{
          width: 210,
          height: 72,
          //fontFamily: "Nudista",
          fontSize: 20,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0.21,
          textAlign: "center",
          color: colors.white
        }}>If you think data is the most important, Pi is the carrier for you.</Text>

        <List style={{ flex: -1, width: '100%' }}>
          <ListItem noBorder>
            <Body>
              <Button block onPress={signIn} style={{
                height: 61,
                borderRadius: 4,
                backgroundColor: colors.white,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowRadius: 2,
                shadowOpacity: 1,
                position: 'relative'
              }}>
                {/* <Icon name='home' style={{ color: colors.warmGrey, position: 'absolute', left: 0 }} /> */}
                <Text style={{ color: colors.warmGrey }}>Sign in with Google</Text>
              </Button>
            </Body>
          </ListItem>
          <ListItem noBorder button onPress={showTermsAndConditions}>
            <Body>
              <Text style={{
                //fontFamily: "Nudista",
                fontSize: 14,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0.15,
                textAlign: "center",
                color: colors.white
              }}>By using Pi you agree to the terms & conditions</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

OnBoarding.propTypes = {
  showTermsAndConditions: PropTypes.func,
  signIn: PropTypes.func
};

export default OnBoarding;

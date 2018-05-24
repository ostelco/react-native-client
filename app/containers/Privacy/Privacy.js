import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Content, Header, Switch} from "native-base";

const Privacy = props => {
    const { goBack,  showPrivacyPolicy, showTermsAndConditions} = props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Privacy</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem noBorder>
              <Body>
                <Text>
                  In order to give you offers that fit your needs, you need to agree to let us:
                </Text>
              </Body>
            </ListItem>
            <ListItem noBorder>
              <Body>
                <Text>Analyze your data usage to be able to give you personalized offers.</Text>
              </Body>
              <Right>
                <Switch value={true} />
              </Right>
            </ListItem>
            <ListItem noBorder button onPress={showPrivacyPolicy}>
              <Body>
                <Text style={{ textDecorationLine: 'underline' }}>Privacy policy</Text>
              </Body>
            </ListItem>
            <ListItem noBorder button onPress={showTermsAndConditions}>
              <Body>
                <Text style={{ textDecorationLine: 'underline' }}>Terms & Conditions</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
}

export default Privacy;
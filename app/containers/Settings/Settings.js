import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Card, CardItem, Col, Row, Grid, Content, Header} from "native-base";

const Settings = props => {
    const { goBack, showUserDetails, showOnBoarding, showPrivacy, showPurchaseHistory, showDeleteAccount } = props;
    return (
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Menu</Title>
          </Body>
        </Header>
        <Content padder>
          <Grid>
            <Row>
              <Col>
                <Card style={{ padding: 20 }}>
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }} button onPress={showUserDetails}>
                    <Icon name="ios-person" style={{ textAlign: 'center' }} />
                    <Text>Personal details</Text>
                  </CardItem>
                </Card>
              </Col>
              <Col>
                <Card style={{ padding: 20 }}>
                  <CardItem cardBody style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }} button onPress={showPrivacy}>
                    <Icon name="key" style={{ textAlign: 'center' }} />
                    <Text>Privacy</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={showPurchaseHistory}>
                    <Text>What you bought</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={showDeleteAccount}>
                    <Text>Delete account</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem button onPress={showOnBoarding}>
                    <Text>Logout</Text>
                  </CardItem>
                </Card>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
}

export default Settings;
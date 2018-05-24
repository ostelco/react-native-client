import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Content, Header} from "native-base";

const PurchaseHistory = props => {
    const { goBack } = props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>What you bought</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem>
              <Body>
                <Text>2018-04-12</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2018-03-25</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2018-03-01</Text>
                <Text note>1 GB</Text>
              </Body>
              <Right>
                <Text note>25 NOK</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
}

export default PurchaseHistory;
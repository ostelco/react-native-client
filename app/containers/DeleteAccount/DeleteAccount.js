import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Radio, Icon, Content, Header} from "native-base";

const DeleteAccount = props => {
    const { goBack, showLogin } = props;
    return (
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Delete account</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem noBorder>
              <Text>
                Deleting your account will delete all remaining data.
              </Text>
            </ListItem>
            <ListItem noBorder>
              <Text style={{ fontWeight: 'bold' }}>
                Why do you want to delete your account?
              </Text>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Got a better deal elsewhere</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>I need a deal to buy a phone</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Too many bugs!</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left style={{ flex: -1 }}>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Rather not say</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Button block onPress={showLogin}>
                  <Text>Delete my account completely</Text>
                </Button>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Button block onPress={goBack}>
                  <Text>Mistake! Sorry didn't mean it take me back</Text>
                </Button>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
}

export default DeleteAccount;
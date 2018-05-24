import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Content, Header} from "native-base";

const PrivacyPolicy = props => {
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
          <Title>Privacy policy</Title>
          </Body>
        </Header>
        <Content padder>
          <List>
            <ListItem header noBorder>
              <Text>Headline</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>We collect information in the following ways</Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information you give us. For example, many of our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number or credit card to store with you account. If you want to take full advantage of the sharing feature we offer, we might also ask you to create a publicly visible profile, which may include your name and photo.
              </Text>
            </ListItem>
            <ListItem noBorder>
              <Text>
                Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you watch a video, visit a website that uses our advertising services, or view and interact with our ads and content.
              </Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
}

export default PrivacyPolicy;
import React from "react";

import {Container, Body, Left, Title, List, Form, Input, Button, Icon, Item, Label, Content, Header} from "native-base";

const UserDetails = props => {
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
          <Title>Personal Details</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input value={'Kerstin Kaspersen'} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={'kerstin@mail.com'} />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input value={'Kongsvejen 72\n1177 Oslo\nNorway\n'} multiline={true} />
          </Item>
        </Form>
      </Content>
    </Container>
    );
}

export default UserDetails;
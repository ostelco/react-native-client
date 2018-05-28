import React from "react";

import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Content, Header} from "native-base";
const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const renderRecord = (purchaseRecord) => (
  <ListItem key={purchaseRecord.product.sku}>
  <Body>
    <Text>{(new Date(purchaseRecord.timestamp)).toLocaleDateString("no", dateFormatOptions)}</Text>
    <Text note>{purchaseRecord.product.presentation.productLabel}</Text>
  </Body>
  <Right>
    <Text note>{purchaseRecord.product.presentation.priceLabel}</Text>
  </Right>
</ListItem>);

const PurchaseHistory = props => {
    const { purchaseRecords, goBack } = props;
    const fields = [];
    if (Array.isArray(purchaseRecords)) {
      for (let i = 0; i < purchaseRecords.length; ++i) {
        fields.push(renderRecord(purchaseRecords[i]));
      }
    }
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
            {fields}
          </List>
        </Content>
      </Container>
    );
}

export default PurchaseHistory;
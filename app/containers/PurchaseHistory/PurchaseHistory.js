import React from "react";
import {Container, Body, Left, Title, Right, Button, Icon, Content, Header, Text} from "native-base";
import styles from './styles';
import {textStyles} from "../../config/fonts";
import {RoundedBorder} from "../../components";
import { PurchaseRecord } from "./components";
import PropTypes from 'prop-types';
import * as _ from "lodash";

const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const PurchaseHistory = props => {
    const { goBack, purchaseRecords } = props;
    const listItems = [];

    for (let i = 0; i < purchaseRecords.length; ++i) {
      const { timestamp, product } = purchaseRecords[i];
      const productLabel = _.get(product, "presentation.productLabel");
      const priceLabel = _.get(product, "presentation.priceLabel");
      const dateLabel = (new Date(timestamp)).toLocaleDateString("no", dateFormatOptions)
      listItems.push(<PurchaseRecord key={i} title={dateLabel} description={productLabel} priceLabel={priceLabel} containerStyle={{ marginVertical: 15}} />)
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header} noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'}>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerLeftButton} />
            </Button>
          </Left>
          <Body style={styles.headerTitleContainer}>
            <Title style={textStyles.textStyle19}>What you bought</Title>
          </Body>
          <Right></Right>
        </Header>
        <RoundedBorder/>
        <Content style={styles.content}>
          { listItems.length > 0 ? listItems : <Text>You don't have any purchases, yet!</Text> }
        </Content>
      </Container>
    );
};

PurchaseHistory.propTypes = {
  goBack: PropTypes.func.isRequired,
  data: PropTypes.array
};

PurchaseHistory.defaultProps = {
  purchaseRecords: []
};

export default PurchaseHistory;
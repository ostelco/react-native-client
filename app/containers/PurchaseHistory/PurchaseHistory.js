import React from "react";
import {Container, Body, Left, Title, Right, Button, Icon, Content, Header} from "native-base";
import styles from './styles';
import {textStyles} from "../../config/fonts";
import {RoundedBorder} from "../../components";
import { PurchaseRecord } from "./components";
import PropTypes from 'prop-types';

const PurchaseHistory = props => {
    const { goBack, data } = props;
    const purchaseRecords = [];

    for (let i = 0; i < data.length; ++i) {
      const { title, description, priceLabel } = data[i];
      purchaseRecords.push(<PurchaseRecord key={i} title={title} description={description} priceLabel={priceLabel} containerStyle={{ marginVertical: 15}} />)
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
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
          { purchaseRecords }
        </Content>
      </Container>
    );
};

PurchaseHistory.propTypes = {
  goBack: PropTypes.func.isRequired,
  data: PropTypes.array
};

PurchaseHistory.defaultProps = {
  data: []
};

export default PurchaseHistory;
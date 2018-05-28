import React from "react";
import {
  Container,
  Left,
  Icon,
  Body,
  Title,
  Text,
  Header,
  Content,
  View,
  Input,
  Right,
  ListItem
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {TouchableHighlight} from "react-native";
import {RoundedBorder} from "../../components";
import styles from "./styles";
import {PaymentSuccessModal} from "./components";

const Payment = props => {
  const { goBack, confirm, isDialogVisible, price , itemDescription} = props;
  return (
    <Container style={styles.container}>
      <PaymentSuccessModal isDialogVisible={isDialogVisible} goBack={goBack} itemDescription={itemDescription} />
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left>
          <Icon name="arrow-back" style={styles.headerLeftButton} onPress={goBack} />
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>
            Purchase
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <Content contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.productDescriptionContainer}>
          <Text style={textStyles.textStyle20}>{itemDescription}</Text>
          <Text style={textStyles.textStyle7}>{price.amount} {price.currency}</Text>
        </View>
        <RoundedBorder />
        <View style={styles.paymentFormContainer}>
          <View style={styles.row}>
            <View style={styles.firstColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>Credit Card Number</Text>
              </View>
              <View style={[styles.secondColumnTextContainer, styles.leftPadding]}>
                <Input placeholder="**** **** **** ****" style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={styles.secondColumn}>
              <View style={styles.firstColumn}>
                <Text style={textStyles.textStyle5}>Expires</Text>
              </View>
              <View style={styles.secondColumnTextContainer}>
                <Input placeholder="MM YY" style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
          <ListItem noBorder />
          <View style={styles.row}>
            <View style={styles.firstColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>Name on Card</Text>
              </View>
              <View style={[styles.secondColumnTextContainer, styles.leftPadding]}>
                <Input style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={styles.secondColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>CVV</Text>
              </View>
              <View style={styles.secondColumnTextContainer}>
                <Input placeholder="***" style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.submitButtonContainer}>
            <TouchableHighlight onPress={confirm}>
              <Text style={textStyles.textStyle6}>{price.amount} {price.currency}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Content>
    </Container>
  )
};

Payment.propTypes = {
  style: PropTypes.object,
  goBack: PropTypes.func,
  confirm: PropTypes.func,
  isDialogVisible: PropTypes.bool
};

export default Payment;

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
  const { goBack, confirm, isDialogVisible, priceLabel , productLabel } = props;
  const { title, creditCardNumberLabel, creditCardExpiresLabel, creditCardNameLabel, creditCardCVVLabel } = props;
  const { creditCardNumberPlaceholder, creditCardExpiresPlaceholder, creditCardCVVPlaceholder } = props;
  return (
    <Container style={styles.container}>
      <PaymentSuccessModal isDialogVisible={isDialogVisible} goBack={goBack} itemDescription={productLabel} />
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left>
          <Icon name="arrow-back" style={styles.headerLeftButton} onPress={goBack} />
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>
            { title }
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <Content contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.productDescriptionContainer}>
          <Text style={textStyles.textStyle20}>{productLabel}</Text>
          <Text style={textStyles.textStyle7}>{priceLabel}</Text>
        </View>
        <RoundedBorder />
        <View style={styles.paymentFormContainer}>
          <View style={styles.row}>
            <View style={styles.firstColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>{ creditCardNumberLabel }</Text>
              </View>
              <View style={[styles.secondColumnTextContainer, styles.leftPadding]}>
                <Input placeholder={creditCardNumberPlaceholder} style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={styles.secondColumn}>
              <View style={styles.firstColumn}>
                <Text style={textStyles.textStyle5}>{ creditCardExpiresLabel }</Text>
              </View>
              <View style={styles.secondColumnTextContainer}>
                <Input placeholder={ creditCardExpiresPlaceholder } style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
          <ListItem noBorder />
          <View style={styles.row}>
            <View style={styles.firstColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>{ creditCardNameLabel }</Text>
              </View>
              <View style={[styles.secondColumnTextContainer, styles.leftPadding]}>
                <Input style={textStyles.textStyle15} />
              </View>
            </View>
            <View style={styles.secondColumn}>
              <View style={styles.firstColumnTextContainer}>
                <Text style={textStyles.textStyle5}>{ creditCardCVVLabel }</Text>
              </View>
              <View style={styles.secondColumnTextContainer}>
                <Input placeholder={ creditCardCVVPlaceholder } style={textStyles.textStyle21} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.submitButtonContainer}>
            <TouchableHighlight onPress={confirm}>
              <Text style={textStyles.textStyle6}>{priceLabel}</Text>
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
  isDialogVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  creditCardNumberLabel: PropTypes.string.isRequired,
  creditCardNumberPlaceholder: PropTypes.string.isRequired,
  creditCardExpiresLabel: PropTypes.string.isRequired,
  creditCardExpiresPlaceholder: PropTypes.string.isRequired,
  creditCardNameLabel: PropTypes.string.isRequired,
  creditCardCVVLabel: PropTypes.string.isRequired,
  creditCardCVVPlaceholder: PropTypes.string.isRequired,

};

Payment.defaultProps = {
  title: 'Purchase',
  creditCardNumberLabel: 'Credit Card Number',
  creditCardNumberPlaceholder: '**** **** **** ****',
  creditCardExpiresLabel: 'Expires',
  creditCardExpiresPlaceholder: 'MM YY',
  creditCardNameLabel: 'Name on Card',
  creditCardCVVLabel: 'CVV',
  creditCardCVVPlaceholder: '***',
}

export default Payment;

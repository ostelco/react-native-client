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
  Right,
  ListItem,
  Spinner,
  CheckBox,
  Switch
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {TouchableOpacity} from "react-native";
import {RoundedBorder} from "../../components";
import styles from "./styles";
import {PaymentSuccessModal} from "./components";
import { CreditCardInput } from "react-native-credit-card-input";
import {List} from "react-native-elements";
import {colors} from "../../config/colors";

const CardList = props => {
  const { cards, onAddClick, onItemClick } = props;
  const items = cards.map(card => (
    <ListItem onPress={() => onItemClick(card)} key={card.id}>
      <Left>
        <Text>{card.brand.toUpperCase() } { card.last4 }, { card.exp_month }/{ (card.exp_year + '').substring(2) }</Text>
      </Left>
      <CheckBox checked={card.isDefault} onPress={() => onItemClick(card)} />
    </ListItem>
  ))
  return (
    <List containerStyle={{ backgroundColor: colors.whiteTwo }}>
      {items}
      <ListItem onPress={onAddClick}>
        <Left>
          <Text>Add</Text>
        </Left>
        <Right>
          <Icon name="add" type="MaterialIcons"></Icon>
        </Right>
      </ListItem>
    </List>
  )
};

const Payment = props => {
  const { goBack, isDialogVisible, priceLabel, productLabel, onChange, onSubmit, isValid, isLoading, saveCard, setSaveCard, cards, showCardList, addNewCard, showAddNewCard, cardSetDefault } = props;
  return (
    <Container style={styles.container}>
      <PaymentSuccessModal isDialogVisible={isDialogVisible} goBack={goBack} itemDescription={productLabel} />
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
          <Text style={textStyles.textStyle20}>{productLabel}</Text>
          <Text style={textStyles.textStyle7}>{priceLabel}</Text>
        </View>
        <RoundedBorder />
        { !addNewCard && showCardList ? (
          <View>
            <CardList cards={cards} onAddClick={showAddNewCard} onItemClick={card => cardSetDefault(card.id)} />
            <View style={[styles.submitButtonContainer]}>
              { isLoading ? <Spinner color="white" /> : (
                <TouchableOpacity onPress={() => onSubmit(true)}>
                  <Text style={textStyles.textStyle6}>Purchase</Text>
                </TouchableOpacity>
              )
              }
            </View>
          </View>
        ) : (
          <View style={styles.paymentFormContainer}>
            <CreditCardInput onChange={onChange} />

            <ListItem noBorder />

            <ListItem>
              <Switch value={saveCard} onValueChange={value => setSaveCard(value)} />
              <Body>
              <Text>Save card for later</Text>
              </Body>
            </ListItem>

            <ListItem noBorder />

            <View style={[styles.submitButtonContainer, isValid ? {} : {opacity: 0.5}]}>
              { isLoading ? <Spinner color="white" /> : (
                <TouchableOpacity onPress={() => { isValid ? onSubmit() : null}}>
                  <Text style={textStyles.textStyle6}>Purchase</Text>
                </TouchableOpacity>
              )
              }
            </View>
          </View>
        )
        }
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

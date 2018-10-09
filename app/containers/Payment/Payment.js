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
  Switch,
  SwipeRow,
  Button,
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {TouchableOpacity, FlatList, ScrollView} from "react-native";
import {RoundedBorder} from "../../components";
import styles from "./styles";
import {PaymentSuccessModal} from "./components";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import {colors} from "../../config/colors";
import {ConfirmDialog} from "react-native-simple-dialogs";
import {compose} from "recompose";
import {connect} from "react-redux";


const CardList = compose(
  connect(({ remoteConfig }) => ({ showAddCardButton: remoteConfig.featureFlagEnableAddCardInApp }))
  )(props => {
  const { cards, onAddClick, onItemClick, onRightItemClick, showAddCardButton } = props;
  // console.log('cardList', cards);

  return (
    <FlatList containerStyle={{ backgroundColor: colors.whiteTwo }}
      data={cards}
      keyExtractor={item => item.id}
      ListFooterComponent={() => {
        if (showAddCardButton) {
          return (
            <ListItem onPress={onAddClick}>
              <Left>
                <Text>Add</Text>
              </Left>
              <Right>
                <Icon name="add" type="MaterialIcons"></Icon>
              </Right>
            </ListItem>
          )
        } else {
          return null;
        }
      }}

      renderItem={({ item }) => (
        <SwipeRow
          key={item.id}
          body={
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
              <Text>{item.details.typeData.brand.toUpperCase() } { item.details.typeData.last4 }, { item.details.typeData.exp_month }/{ (item.details.typeData.exp_year + '').substring(2) }</Text>
              <CheckBox checked={item.isDefault} onPress={() => onItemClick(item)} />
            </View>
          }
          rightOpenValue={-75}
          right={
            <Button danger onPress={() => onRightItemClick(item)}>
              <Icon active name="trash" />
            </Button>
          }
        />
      )}
    />
  )
});

const ConfirmDialogContainer = compose(

)(props => {
  const { isVisible, handlePositiveButton,  handleNegativeButton} = props;
  // console.log('ConfirmDialogContainer', props)
  return (
    <ConfirmDialog
      title="Confirm Dialog"
      message="Are you sure about that?"
      visible={isVisible}
      onTouchOutside={handleNegativeButton}
      positiveButton={{
        title: "YES",
        onPress: handlePositiveButton
      }}
      negativeButton={{
        title: "NO",
        onPress: handleNegativeButton
      }}
    />
  )
});

const Payment = props => {
  const { goBack, selectedCard, showFullScreenLoading, isDialogVisible, priceLabel, productLabel, onChange, onSubmit, isValid, isLoading, saveCard, setSaveCard, cards, showCardList, addNewCard, showAddNewCard, cardSetDefault, cardRemove, isConfirmDialogVisible, setIsConfirmDialogVisible, setSelectedCard, featureFlagEnableAddCardInApp } = props;
  // console.log('Payment', props);
  return (
    <Container style={styles.container}>
      {showFullScreenLoading ? (
        <View style={{position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 999,
          opacity: 0.75,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center'}}>
          <Spinner color="white" />
        </View>
      ) : null}
      <ConfirmDialogContainer isVisible={isConfirmDialogVisible} handlePositiveButton={() => {
        console.log(selectedCard);
        selectedCard && cardRemove(selectedCard.id)
        setIsConfirmDialogVisible(false);
      } } handleNegativeButton={() => setIsConfirmDialogVisible(false)} />
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
      <Content contentContainerStyle={styles.content} scrollEnabled={false}>
        <View style={styles.productDescriptionContainer}>
          <Text style={textStyles.textStyle20}>{productLabel}</Text>
          <Text style={textStyles.textStyle7}>{priceLabel}</Text>
        </View>
        <RoundedBorder />
        { !addNewCard && showCardList ? (
          <ScrollView>
            <CardList cards={cards} onAddClick={showAddNewCard} onItemClick={card => cardSetDefault(card.id)} onRightItemClick={card => {
              setSelectedCard(card);
              setIsConfirmDialogVisible(true);
            }} />
            <View style={[styles.submitButtonContainer]}>
              { isLoading ? <Spinner color="white" /> : (
                <TouchableOpacity onPress={() => onSubmit(true)}>
                  <Text style={textStyles.textStyle6}>Purchase</Text>
                </TouchableOpacity>
              )
              }
            </View>
          </ScrollView>
        ) : (featureFlagEnableAddCardInApp ? (
            <View style={styles.paymentFormContainer}>
              <LiteCreditCardInput onChange={onChange} />

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
          ) : <Text>There are no cards connected to your profile. Please use our webpages to add a card.</Text>
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

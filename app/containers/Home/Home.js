import React from "react";
import {
  Container,
  Icon,
  Body,
  Title,
  Text,
  Header,
  Content,
  List,
  ListItem,
  View,
  Right,
  Spinner,
  Left
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import { TouchableHighlight } from "react-native";
import styles from './styles';
import {RoundedBorder} from "../../components";

const Home = props => {
  const { showMenu, showPayment, dataLeft, defaultOffer, specialOffer } = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left></Left>
        <Body>
          <Title style={textStyles.textStyle11}>
            pi
          </Title>
        </Body>
        <Right>
          <Icon name="menu" style={styles.headerRightButton} onPress={showMenu} />
        </Right>
      </Header>
      <Content contentContainerStyle={styles.content} bounces={false}>
        <List style={styles.topContentContainer}>
          <ListItem noBorder>
            { dataLeft ? (
              <Body>
                <Text style={textStyles.textStyle12}>
                  { dataLeft }
                </Text>
                <Text style={textStyles.textStyle13}>Left</Text>
              </Body>
              ) : <Body><Spinner color="white" /></Body>}
          </ListItem>
          <ListItem noBorder onPress={() => showPayment(defaultOffer)}>
            <Body style={styles.staticOfferContainer}>
              <View style={styles.staticOfferButtonContainer}>
                  <Text style={[textStyles.textStyle14, styles.offerButton]}>{defaultOffer ? defaultOffer.sku : ''}</Text>
                  <Text style={[textStyles.textStyle15, styles.offerButton]}>40 NOK</Text>
              </View>
            </Body>
          </ListItem>
        </List>
        <RoundedBorder color={colors.rosa} />
        { specialOffer ? (
          <View style={styles.specialOfferContainer}>
            <View style={styles.specialOffer}>
              <Text style={textStyles.textStyle8}>
                Monday Special!
              </Text>
              <TouchableHighlight onPress={() => showPayment(specialOffer)}>
                <View style={styles.specialOfferButtonContainer}>
                  <View style={styles.specialOfferButtonTextContainer}>
                    <Text style={[textStyles.textStyle16, styles.offerButton]}>{specialOffer ? specialOffer.sku : ''}</Text>
                  </View>
                  <View style={styles.specialOfferButtonTextContainer}>
                    <Text style={[textStyles.textStyle17, styles.offerButton]}>{specialOffer.price.amount} {specialOffer.price.currency}</Text>
                  </View>
                </View>
              </TouchableHighlight>
              <Text style={textStyles.textStyle18}>
                Lorem ipsum dolor sit amet, consec tetur dipiscing elit lorum ipsum…
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.specialOfferContainer}>
            <View style={styles.specialOffer}>
              <Text style={textStyles.textStyle8}>
                <Icon name="basket" style={styles.emptyOfferIcon} />
              </Text>
              <Text style={textStyles.textStyle18}>
                Once we’ve learned a little bit more about you, you will find personalized offers here!
              </Text>
            </View>
          </View>
        )}
      </Content>
    </Container>
  )
};

Home.propTypes = {
  style: PropTypes.object,
  showMenu: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  dataLeft: PropTypes.string,
  defaultOffer: PropTypes.object,
  specialOffer: PropTypes.object
};

export default Home;

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
  Left
} from "native-base";
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import { TouchableHighlight } from "react-native";
import styles from './styles';
import {RoundedBorder} from "../../components";
import DataLeftContainer from './DataLeftContainer';
import OfferContainer from './OfferContainer';

const DisplayList = ({ list, noBorder=false, listStyles={} }) => (
  <List style={listStyles}>
    {list.map(component => {
      return (
        <ListItem noBorder={noBorder}>
          {component}
        </ListItem>
      )
    })}
  </List>
);

const Home = props => {
  const { showMenu, showPayment, specialOffer } = props;
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
        <DisplayList
          noBorder={true}
          list={[
            <DataLeftContainer />,
            <OfferContainer />
          ]}
          listStyles={styles.topContentContainer}
        />
        <RoundedBorder color={colors.rosa} />
        { specialOffer ? (
          <View style={styles.specialOfferContainer}>
            <View style={styles.specialOffer}>
              <Text style={textStyles.textStyle8}>
              {_.get(specialOffer, "presentation.offerLabel")}
              </Text>
              <TouchableHighlight onPress={() => showPayment(specialOffer)}>
                <View style={styles.specialOfferButtonContainer}>
                  <View style={styles.specialOfferButtonTextContainer}>
                    <Text style={[textStyles.textStyle16, styles.offerButton]}>{_.get(specialOffer, "presentation.productLabel")}</Text>
                  </View>
                  <View style={styles.specialOfferButtonTextContainer}>
                    <Text style={[textStyles.textStyle17, styles.offerButton]}>{_.get(specialOffer, "presentation.priceLabel")}</Text>
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
  specialOffer: PropTypes.object,
};

export default Home;

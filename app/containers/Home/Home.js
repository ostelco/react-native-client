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
  Left,
  Footer
} from "native-base";
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import { TouchableHighlight } from "react-native";
import styles from './styles';
import {RoundedBorder} from "../../components";
import Referral from "./Referral";
import {withProfileFromState, withReferralIdFromState} from "../../helper/enhancers";
import {branch, lifecycle, renderNothing, withState} from "recompose";
import {getReferralLink} from "../../helper/referral";

const Home = props => {
  const { showMenu, showPayment, dataLeft, defaultOffer, specialOffer, doUpdate, showReferralMessage, closeReferralMessage } = props;
  return (
    <Container style={styles.container}>
      <ReferralMessageModal isDialogVisible={showReferralMessage} goBack={closeReferralMessage} itemDescription={'1 GB'} closeButtonLabel={'Much Appreciated!'} />
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
                <TouchableHighlight onPress={doUpdate}>
                  <View>
                    <Text style={textStyles.textStyle12}>
                      { dataLeft }
                    </Text>
                    <Text style={textStyles.textStyle13}>Left</Text>
                  </View>
                </TouchableHighlight>
              </Body>
              ) : <Body><Spinner color="white" /></Body>}
          </ListItem>
          <ListItem noBorder onPress={() => showPayment(defaultOffer)}>
            <Body style={styles.staticOfferContainer}>
              <View style={styles.staticOfferButtonContainer}>
                <Text style={[textStyles.textStyle14, styles.offerButton]}>{_.get(defaultOffer, "presentation.productLabel")}</Text>
                <Text style={[textStyles.textStyle15, styles.offerButton]}>{_.get(defaultOffer, "presentation.priceLabel")}</Text>
              </View>
            </Body>
          </ListItem>
        </List>
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
      <ReferralFooterContainer />
    </Container>
  )
};

import { compose } from 'recompose';
import { ReferralMessageModal } from "./components";

const ReferralFooter = (props) => {
  const { referralLink, profile } = props;
  return (
    <Footer style={ styles.footer }>
      <Referral referralLink={referralLink} name={profile.data.name} />
    </Footer>
  );
}

const ReferralFooterContainer = compose(
  withReferralIdFromState,
  withProfileFromState,
  branch(({ referralId, profile }) => !referralId || profile.isFetching || !profile.queried, renderNothing),
  withState('referralLink', 'setReferralLink', ''),
  lifecycle({
    async componentDidMount() {
      const { referralId, setReferralLink, profile } = this.props;
      const referralLink = await getReferralLink(referralId, profile.data.name)
      setReferralLink(referralLink);
    }
  }),
  branch(({ referralLink}) => referralLink === '', renderNothing)
)(ReferralFooter);


Home.propTypes = {
  style: PropTypes.object,
  showMenu: PropTypes.func.isRequired,
  showPayment: PropTypes.func.isRequired,
  dataLeft: PropTypes.string,
  defaultOffer: PropTypes.object,
  specialOffer: PropTypes.object,
  doUpdate: PropTypes.func.isRequired
};

export default Home;

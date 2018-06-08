import React from "react";
import {
  Container,
  Icon,
  Body,
  Title,
  Header,
  Content,
  List,
  ListItem,
  Right,
  Left,
  Text,
  View
} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import {colors} from "../../config/colors";
import styles from './styles';
import {RoundedBorder} from "../../components";
import DataLeftContainer from './DataLeftContainer';
import OfferContainer from './OfferContainer';
import SpecialOfferContainer from "./SpecialOfferContainer";

const DisplayList = ({ list, noBorder=false, listStyles={} }) => (
  <List style={listStyles}>
    {list.map((component, i) => {
      return (
        <ListItem key={i} noBorder={noBorder}>
          {component}
        </ListItem>
      )
    })}
  </List>
);

const Home = props => {
  const { showMenu, title, style } = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={style.header}>
        <Left></Left>
        <Body>
          <Title style={textStyles.textStyle11}>
            {title}
          </Title>
        </Body>
        <Right>
          <Icon name="menu" style={style.headerRightButton} onPress={showMenu} />
        </Right>
      </Header>
      <Content contentContainerStyle={style.content} bounces={false}>
        <DisplayList
          noBorder={true}
          list={[
            <DataLeftContainer />,
            <OfferContainer />
          ]}
          listStyles={style.topContentContainer}
        />
        <RoundedBorder color={colors.rosa} />
        <SpecialOfferContainer />
      </Content>
    </Container>
  )
};

export const HomeWithoutSubscription = props => {
  const { showMenu, title, icon, subTitle, description, style } = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5}'} style={style.header}>
        <Left></Left>
        <Body>
          <Title style={textStyles.textStyle11}>
            {title}
          </Title>
        </Body>
        <Right>
          <Icon name="menu" style={style.headerRightButton} onPress={showMenu} />
        </Right>
      </Header>
      <Content contentContainerStyle={style.content} bounces={false}>
        <View style={[style.topContentContainer, style.topContentEmptyContainer]}>
          <Icon name={icon} style={style.emptyContainerIcon} />
          <Text style={textStyles.textStyle11}>{ subTitle }</Text>
        </View>
        <RoundedBorder color={colors.rosa} />
        <View style={style.descriptionContainer}>
          <Text style={textStyles.textStyle27}>{ description }</Text>
        </View>
      </Content>
    </Container>
  )
};

HomeWithoutSubscription.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
};

HomeWithoutSubscription.defaultProps = {
  title: 'pi',
  icon: 'warning',
  subTitle: 'Oops! We could not find your subscription!',
  description: 'Please let us know and we\'ll fix it for you.',
  style: styles
};

Home.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  showMenu: PropTypes.func.isRequired
};

Home.defaultProps = {
  title: 'pi',
  style: styles
};

export default Home;

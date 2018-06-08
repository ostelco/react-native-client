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
  Left
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
  const { showMenu, title } = props;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left></Left>
        <Body>
          <Title style={textStyles.textStyle11}>
            {title}
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
        <SpecialOfferContainer />
      </Content>
    </Container>
  )
};

Home.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  showMenu: PropTypes.func.isRequired
};

Home.defaultProps = {
  title: 'pi'
};

export default Home;

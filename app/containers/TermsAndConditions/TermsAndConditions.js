import React from "react";
import {Container, Left, Button, Icon, Body, Title, Text, Header, Content, List, ListItem, View, Right} from "native-base";
import PropTypes from 'prop-types';
import {textStyles} from "../../config/fonts";
import styles from './styles';
import {RoundedBorder} from "../../components";


const TermsAndConditions = props => {
  const { goBack, isModal, presentationData } = props;
  const { title, subTitle, paragraphs } = presentationData;
  return (
    <Container style={styles.container}>
      <Header noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
        <Left>
          {isModal ? null : (
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerButton}/>
            </Button>
          )}
        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>
            {title}
          </Title>
        </Body>
        <Right>
          {isModal ? (
            <Button transparent onPress={goBack}>
              <Icon name="close" style={styles.headerButton}/>
            </Button>
          ) : null}
        </Right>
      </Header>
      <RoundedBorder />
      <Content contentContainerStyle={styles.content}>
        <List>
          <ListItem noBorder>
            <Text style={textStyles.textStyle5}>{subTitle}</Text>
          </ListItem>
          {paragraphs.map(({ value, id }) => (
            <ListItem noBorder key={id}>
              <Text style={textStyles.textStyle15}>
                {value}
              </Text>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
};

TermsAndConditions.propTypes = {
  goBack: PropTypes.func.isRequired,
  isModal: PropTypes.bool
};

TermsAndConditions.defaultProps = {
  isModal: true
}

export default TermsAndConditions;

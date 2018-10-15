import React from "react";
import {Container, Body, Left, Title, Right, Text, Button, Icon, Content, Header, View} from "native-base";
import styles from './styles';
import {RoundedBorder} from "../../components";
import {textStyles} from "../../config/fonts";
import {TermsAndConditionsLinkContainer} from "../../components/ExternalLink/ExternalLink";

const Privacy = props => {
    const { goBack } = props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header} noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'}>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerLeftButton} />
            </Button>
          </Left>
          <Body style={styles.headerTitleContainer}>
            <Title style={textStyles.textStyle19}>Privacy</Title>
          </Body>
          <Right></Right>
        </Header>
        <RoundedBorder />
        <Content style={styles.content}>
          <View style={styles.linkButtonContainer}>
            <TermsAndConditionsLinkContainer />
          </View>
        </Content>
      </Container>
    );
};

export default Privacy;
import React from "react";
import {Container, Body, Left, Title, List, ListItem, Right, Text, Button, Icon, Content, Header} from "native-base";
import {textStyles} from "../../config/fonts";
import styles from './styles';
import { RoundedBorder } from "../../components";

const PrivacyPolicy = props => {
  const { goBack } = props;
  return (
    <Container style={styles.container}>
      <Header style={styles.header} noShadow androidStatusBarColor={'rgba(0,0,0,0.5)'}>
        <Left>

        </Left>
        <Body style={styles.headerTitleContainer}>
          <Title style={textStyles.textStyle19}>Privacy Policy</Title>
        </Body>
        <Right>
          <Button transparent onPress={goBack}>
            <Icon name="close" style={styles.headerRightButton} />
          </Button>
        </Right>
      </Header>
      <RoundedBorder/>
      <Content style={styles.content}>
        <List>
          <ListItem header noBorder>
            <Text style={textStyles.textStyle5}>5 May 2018</Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec nibh justo. Fusce interdum tellus sit amet augue eleifend, in porttitor nulla scelerisque. </Text>
          </ListItem>
          <ListItem noBorder>
            <Text style={textStyles.textStyle15}>
              Duis nec nibh justo. Fusce interdum tellus sit amet augue eleifend, in porttitor nulla scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

export default PrivacyPolicy;
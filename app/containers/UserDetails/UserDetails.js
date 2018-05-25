import React from "react";

import {Container, Body, Left, Title, Button, Icon, Content, Header, Right, ListItem, Text, View} from "native-base";
import styles from './styles';
import {RoundedBorder} from "../../components";
import {textStyles} from "../../config/fonts";
import PropTypes from 'prop-types';

const UserDetails = props => {
    const { goBack, profile } = props;
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={'rgba(0,0,0,0.5)'} style={styles.header}>
          <Left style={styles.headerLeft}>
            <Button transparent onPress={goBack}>
              <Icon name="arrow-back" style={styles.headerIcon} />
            </Button>
          </Left>
          <Body style={styles.headerTitleContainer}>
            <Title>Personal Details</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <RoundedBorder />
        <Content style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <View>
              <Text style={textStyles.textStyle5}>Name</Text>
              <Text style={textStyles.textStyle15}>{ profile.name }</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <Text style={textStyles.textStyle8}>Edit</Text>
              </View>
            </View>
          </View>
          <ListItem noBorder></ListItem>
          <View style={styles.itemContainer}>
            <View>
              <Text style={textStyles.textStyle5}>Email</Text>
              <Text style={textStyles.textStyle15}>{ profile.email }</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <Text style={textStyles.textStyle8}>Edit</Text>
              </View>
            </View>
          </View>
          <ListItem noBorder></ListItem>
          <View style={styles.itemContainer}>
            <View>
              <Text style={textStyles.textStyle5}>Address</Text>
              <Text style={textStyles.textStyle15}>{ profile.street }</Text>
              <Text style={textStyles.textStyle15}>{ profile.postalCode } { profile.city }</Text>
              <Text style={textStyles.textStyle15}>{ profile.country }</Text>
            </View>
            <View style={styles.editButtonContainer}>
              <View style={styles.editButton}>
                <Text style={textStyles.textStyle8}>Edit</Text>
              </View>
            </View>
          </View>
        </Content>
    </Container>
    );
};

UserDetails.propTypes = {
  goBack: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default UserDetails;
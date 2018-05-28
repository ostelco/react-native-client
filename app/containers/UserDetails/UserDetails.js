import React from "react";

import {Container, Body, Left, Title, Button, Icon, Content, Header, Right, ListItem, Text, View} from "native-base";
import styles from './styles';
import {RoundedBorder} from "../../components";
import {textStyles} from "../../config/fonts";
import PropTypes from 'prop-types';
import {TouchableOpacity} from "react-native";

const renderField = (key, label, value, onClick) => (
  <View key={key} style={styles.itemContainer}>
    <View>
      <Text style={textStyles.textStyle5}>{ label }</Text>
      <Text style={textStyles.textStyle15}>{ value }</Text>
    </View>
    <TouchableOpacity style={styles.editButtonContainer} onPress={onClick}>
      <View style={styles.editButton}>
        <Text style={textStyles.textStyle8}>Edit</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const renderSeparator = key => <ListItem key={key} noBorder></ListItem>;

const UserDetails = props => {
    const { goBack, profile, goEdit } = props;
    const items = [{
      label: 'Name',
      key: 'name'
    }, {
      label: 'Email',
      key: 'email'
    }, {
      label: 'Address',
      key: 'address'
    }, {
      label: 'Postal Code',
      key: 'postCode'
    }, {
      label: 'City',
      key: 'city'
    }, {
      label: 'Country',
      key: 'country'
    }];

    const fields = [];
    for (let i = 0; i < items.length; ++i) {
      const { label, key } = items[i];
      fields.push(renderField(`${i}-item`, label, profile[key], () => goEdit(label, key)))
      fields.push(renderSeparator(`${i}-separator`));
    };
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
          { fields }
        </Content>
    </Container>
    );
};

UserDetails.propTypes = {
  goBack: PropTypes.func.isRequired,
  goEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default UserDetails;
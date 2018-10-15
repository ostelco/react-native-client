import {compose} from "recompose";
import {Linking, TouchableOpacity} from "react-native";
import React from 'React';
import {Text, View, ListItem, Body} from "native-base";
import styles from "../../containers/Privacy/styles";
import {textStyles} from "../../config/fonts";
import {connect} from "react-redux";

const openExternalLink = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => {
    console.error('An error occurred', err);
    alert('An error has occured. Try again later.');
  });
};

const ExternalLink = ({ component, externalLink }) => {
  return React.cloneElement(component, {
    onPress() {
      openExternalLink(externalLink)
    }
  });
}

export default compose(

)(ExternalLink)

const TermsAndConditionsLink = (props) => {
  const { externalLink } = props;
  return (
    <ExternalLink
      externalLink={externalLink}
      component={(
        <TouchableOpacity>
          <View style={styles.linkButton}>
            <Text style={textStyles.textStyle26}>Terms & Conditions</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
};

const TermsAndConditionsLinkAsListItem = (props) => {
  const { externalLink, noBorder } = props;
  return (
    <ExternalLink
      externalLink={externalLink}
      component={(
        <ListItem noBorder={noBorder} button>
          <Body>
            <Text style={textStyles.textStyle2}>By using Pi you agree to the terms & conditions</Text>
          </Body>
        </ListItem>
      )}
    />
  )
};

export const TermsAndConditionsLinkContainer = compose(
  connect(({ remoteConfig }) => ({
    externalLink: remoteConfig.termsAndConditionsExternalLink
  }))
)(TermsAndConditionsLink);

export const TermsAndConditionsLinkAsListItemContainer = compose(
  connect(({ remoteConfig }) => ({
    externalLink: remoteConfig.termsAndConditionsExternalLink
  }))
)(TermsAndConditionsLinkAsListItem);


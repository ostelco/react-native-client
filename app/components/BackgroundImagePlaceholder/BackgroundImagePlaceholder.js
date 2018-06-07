import React from 'react';
import { Container } from 'native-base';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const BackgroundImagePlaceholder = props => {
  const { source, styles } = props;
  return (
    <Container>
      <Image source={source} style={styles.image}/>
    </Container>
  )
};

BackgroundImagePlaceholder.propTypes = {
  source: PropTypes.any.isRequired,
  styles: PropTypes.object.isRequired
};

BackgroundImagePlaceholder.defaultProps = {
  source: require('../../../assets/sweets.jpg'),
  styles: styles
};

export default BackgroundImagePlaceholder;

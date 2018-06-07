import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
import PropTypes from "prop-types";

const LoadingPlaceholder = props => {
  const { color } = props;
  return (
    <Container>
      <Header />
      <Content>
        <Spinner color={color} />
      </Content>
    </Container>
  )
};

LoadingPlaceholder.propTypes = {
  color: PropTypes.string.isRequired
};

LoadingPlaceholder.defaultProps = {
  color: "blue"
};

export default LoadingPlaceholder;

import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

const GRAPHCMS_API = 'https://api.graphcms.com/simple/v1/cji4bob2x6zsr01910ioet78h';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'DefaultProduct': return object.__typename + ':' + object.sku; // use `key` as the primary key
      case 'OfferProduct': return object.__typename + ':' + object.sku; // use `bar` prefix and `blah` as the primary key
      default: return object.__typename + ':' + object.id; // fall back to default handling
    }
  }
});

persistCache({
  cache,
  storage: AsyncStorage,
  debug: true // TODO: Set false in production mode
});

const stateLink = withClientState({
  cache,
  resolvers: {
    DefaultProduct: {
      amount: () => 0,
      currency: () => 'NOK'
    },
    OfferProduct: {
      amount: () => 0,
      currency: () => 'NOK'
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, new HttpLink({
    uri: GRAPHCMS_API
  })]),
  cache
});

export default client;

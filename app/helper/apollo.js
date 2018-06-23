import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { defaults } from './resolvers';
import { getAllProducts } from "./graphql";

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
})
  .then(() => {
    // console.log(JSON.stringify(client.cache.data, null))
  });

const stateLink = withClientState({
  cache,
  defaults,
});

import apolloLogger from 'apollo-link-logger';

const DEFAULT_FETCH_POLICY = 'cache-and-network';
// const DEFAULT_FETCH_POLICY = 'cache-first';

// TODO: Try to use resolvers to store price and currency https://www.apollographql.com/docs/link/links/state.html
const client = new ApolloClient({
  link: ApolloLink.from([apolloLogger, stateLink, new HttpLink({
    uri: GRAPHCMS_API
  })]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: DEFAULT_FETCH_POLICY,
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: DEFAULT_FETCH_POLICY,
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
});

// client.onResetStore(stateLink.writeDefaults);

client.query({
  query: getAllProducts,
  fetchPolicy: 'network-only'
})
  .then(() => {
    // console.log('prefetch all products')
  });

export default client;

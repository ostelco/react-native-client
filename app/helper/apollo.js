import ApolloClient from 'apollo-boost';
import {getGDPR, getOnBoarding, getAllProducts, getSignUp, getTermsAndConditions} from "./graphql";
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const GRAPHCMS_API = 'https://api.graphcms.com/simple/v1/cji4bob2x6zsr01910ioet78h';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
  cacheRedirects: {
    Query: {
      OfferProduct: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'OfferProduct', sku: args.sku }),
      DefaultProduct: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'DefaultProduct', sku: args.sku }),
    }
  }
});

const client = new ApolloClient({
  uri: GRAPHCMS_API,
  cache,
});

// Prefetch data
client.query({
  query: getOnBoarding
}).then(data => {
  console.log('Prefetched OnBoarding', data);
}).catch(err => console.error(err));

client.query({
  query: getSignUp
}).then(data => {
  console.log('Prefetched SignUp', data);
}).catch(err => console.error(err));

client.query({
  query: getTermsAndConditions
}).then(data => {
  console.log('Prefetched TermsAndConditions', data);
}).catch(err => console.error(err));

client.query({
  query: getGDPR
}).then(data => {
  console.log('Prefetched GDPR', data);
}).catch(err => console.error(err));

client.query({
  query: getAllProducts
}).then(data => {
  console.log('Prefetched Products', data);
}).catch(err => console.error(err));

export default client;

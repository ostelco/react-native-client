import ApolloClient from 'apollo-boost';
import {getGDPR, getOnBoarding, getSignUp, getTermsAndConditions} from "./graphql";

const GRAPHCMS_API = 'https://api.graphcms.com/simple/v1/cji4bob2x6zsr01910ioet78h';

const client = new ApolloClient({
  uri: GRAPHCMS_API,
  cacheRedirects: {
    Query: {
      OnBoarding: (_, {id}, {getCacheKey}) => getCacheKey({id, __typename: 'OnBoarding'}),
      SignUp: (_, {id}, {getCacheKey}) => getCacheKey({id, __typename: 'SignUp'})
    }
  }
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

export default client;

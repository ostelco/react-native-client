import ApolloClient from 'apollo-boost';
import {getOnBoarding, getSignUp} from "./graphql";

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
}).then(() => {
  console.log('Prefetched OnBoarding');
}).catch(err => console.error(err));

client.query({
  query: getSignUp
}).then(() => {
  console.log('Prefetched SignUp');
}).catch(err => console.error(err));

export default client;

import ApolloClient from 'apollo-boost';
import {getOnBoarding} from "./graphql";

const GRAPHCMS_API = 'https://api.graphcms.com/simple/v1/cji4bob2x6zsr01910ioet78h';

const client = new ApolloClient({
  uri: GRAPHCMS_API,
  cacheRedirects: {
    Query: {
      OnBoarding: (_, {id}, {getCacheKey}) => getCacheKey({id, __typename: 'OnBoarding'})
    }
  }
});

// Prefetch data
client.query({
  query: getOnBoarding
}).then(() => {
  console.log('SUCCESS!@!!!!!!')
}).catch(err => console.error(err));

export default client;

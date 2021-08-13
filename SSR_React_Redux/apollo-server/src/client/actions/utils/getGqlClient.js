import ApolloBoost from 'apollo-boost';
import fetch from 'node-fetch';

const getGqlClient = () => {
  return new ApolloBoost({
    uri: 'https://countries.trevorblades.com',
    fetch
  });
};

export { getGqlClient as default }
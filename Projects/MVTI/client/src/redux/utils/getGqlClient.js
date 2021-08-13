import {
  ApolloClient, split, HttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import authLib from '../../lib/auth';

const token = authLib.getToken();

const httpLink = new HttpLink({
  uri: 'https://mvti.herokuapp.com/',
});

const wsLink = new WebSocketLink({
  uri: 'wss://mvti.herokuapp.com/',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  },
}));

const getGqlClient = () => new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export { getGqlClient as default };

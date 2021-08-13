import { gql } from '@apollo/client';
import getGqlClient from '../utils/getGqlClient';

const client = getGqlClient();

const gqlSubscribeFriendRequest = gql`
  subscription friendRequest($myRequests: Boolean) {
    friendRequest(myRequests: $myRequests) {
      id
      requestUserId
      targetUserId
      isAccepted
    }
  }
`;

const subscribeFriendRequest = async (acceptsRequestsToMeOnly) => {
  const myRequests = acceptsRequestsToMeOnly;
  const observable = await client.subscribe({
    query: gqlSubscribeFriendRequest,
    variables: { myRequests },
  });
  return observable;
};

const friendOperations = {
  subscribeFriendRequest,
};

export default friendOperations;

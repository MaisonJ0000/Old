import { objectType, booleanArg } from '@nexus/schema';
import { withFilter } from 'graphql-yoga';
import _ from 'lodash';
import getUserId from '../utils/getUserId';

const Subscription = objectType({
  name: 'Subscription',
  definition(t) {
    t.field('friendRequest', {
      type: 'FriendRequest',
      args: {
        myRequests: booleanArg(),
      },
      subscribe: withFilter(
        (parent, args, ctx) => ctx.pubsub.asyncIterator('REQUEST_FRIEND'),
        (payload, args, ctx) => {
          if (args.myRequests) {
            const userId = getUserId({ authorization: _.get(ctx, 'connection.context.Authorization') });
            return payload.friendRequest.targetUserId === userId;
          }
          return true;
        },
      ),
    });
  },
});

export { Subscription as default };

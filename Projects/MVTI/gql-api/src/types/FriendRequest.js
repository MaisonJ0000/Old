import { objectType } from '@nexus/schema';

const FriendRequest = objectType({
  name: 'FriendRequest',
  definition(t) {
    t.model.id();
    t.model.requestUserId();
    t.model.targetUserId();
    t.model.isAccepted();
  },
});

export { FriendRequest as default };

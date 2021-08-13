import { queryType, arg } from '@nexus/schema';
import _ from 'lodash';
import getUserId from '../utils/getUserId';

const Query = queryType({
  definition(t) {
    t.list.field('myReviews', {
      type: 'Review',
      args: {
        query: arg({
          type: 'FindManyReviewArgs',
          nullable: true,
        }),
      },
      resolve: (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const query = _.merge({ ...args.query }, {
          where: { author: { id: userId } },
        });
        return ctx.prisma.review.findMany(query);
      },
    });

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        return ctx.prisma.user.findOne({
          where: {
            id: userId,
          },
        });
      },
    });

    t.crud.user();
    t.crud.users({ filtering: true, ordering: true, pagination: true });
    t.crud.movie();
    t.crud.movies({ filtering: true, ordering: true, pagination: true });
    t.crud.review();
    t.crud.reviews({ filtering: true, ordering: true, pagination: true });
  },
});

export { Query as default };

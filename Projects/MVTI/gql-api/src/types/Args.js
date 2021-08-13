import { inputObjectType } from '@nexus/schema';

const FindManyReviewArgs = inputObjectType({
  name: 'FindManyReviewArgs',
  definition(t) {
    t.int('take');
    t.int('skip');
    t.field('orderBy', { type: 'ReviewOrderByInput' });
    t.field('where', { type: 'ReviewWhereInput' });
  },
});

export { FindManyReviewArgs as default };

import { objectType } from '@nexus/schema';

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.model.id();
    t.model.rating();
    t.model.text();
    t.model.author();
    t.model.movie();
  },
});

export { Review as default };

import { objectType } from '@nexus/schema';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.reviews({
      pagination: false,
    });
    t.model.friends({
      pagination: false,
    });
  },
});

export { User as default };

import { objectType } from '@nexus/schema';

const Movie = objectType({
  name: 'Movie',
  definition(t) {
    t.model.id();
    t.model.titleKr();
    t.model.titleEn(         );
    t.model.imdbId();
    t.model.year();
    t.model.genre();
    t.model.poster();
    t.model.reviews({
      pagination: false,
    });
  },
});

export { Movie as default };

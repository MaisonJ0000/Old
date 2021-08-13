const { objectType } = require('@nexus/schema');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.reviews({
      pagination: false,
    });
  },
});

const Movie = objectType( {
  name: 'Movie',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.poster();
    t.model.reviews({
      pagination: false,
    })
  },
});

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

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users();
    t.crud.movie();
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
  },
});

export {
  User,
  Movie,
  Review,
  Query,
  Mutation,
};
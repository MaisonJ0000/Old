const { objectType } = require('@nexus/schema');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts({
      pagination: false,
    });
  },
});

const Post = objectType( {
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.comments({
      pagination: false,
    })
  },
});

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.author();
    t.model.post();
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    console.log("[JONGMAN_LOG] t.crud", t.crud, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    t.crud.user();
    t.crud.users();
    t.crud.post();
    t.crud.posts();
    t.crud.comment();
    t.crud.comments();
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    console.log("[JONGMAN_LOG] t.crud", t.crud, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    t.crud.createOneUser();
    t.crud.createOnePost();
    t.crud.createOneComment();
  },
});

export {
  User,
  Post,
  Comment,
  Query,
  Mutation,
};
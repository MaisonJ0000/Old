const { GraphQLServer } = require('graphql-yoga');
const { makeSchema } = require('@nexus/schema');
const { PrismaClient } = require('@prisma/client');
const { nexusPrismaPlugin } = require('nexus-prisma');
const { User, Post, Comment, Query, Mutation } = require('./types/index');

const prisma = new PrismaClient();

const startOptions = {
  port: process.env.PORT || 4000,
};

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Mutation, User, Post, Comment],
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
  }),
  context: { prisma },
}).start(startOptions, ({ port }) => {
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  );
});
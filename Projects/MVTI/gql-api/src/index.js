import 'babel-polyfill';
import { makeSchema } from '@nexus/schema';
import types from './types';

const { GraphQLServer, PubSub } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { nexusPrismaPlugin } = require('nexus-prisma');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const options = {
  port: process.env.PORT || 4000,
};

new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: `${__dirname}/../schema.graphql`,
      typegen: `${__dirname}/generated/nexus.ts`,
    },
  }),
  context: (request) => ({
    ...request,
    prisma,
    pubsub,
  }),
}).start(options, ({ port }) => {
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  );
});

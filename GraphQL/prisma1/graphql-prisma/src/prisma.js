import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from "./resolvers/index";

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

export { prisma as default }

// const createPostForUser = async (authorId, data) => {
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ id }');
//   const user = await prisma.query.user({
//     where: {
//       id: authorId
//     }
//   }, '{ id name email posts { id title published } }');
//   return user;
// };
//
// createPostForUser('ckav5yzs9003k0852kz6nnk1u', {
//     title: "hi",
//     body: "the war of art",
//     published: true,
// }).then((user) => {
//   console.log("[JONGMAN_LOG] JSON.stringify(user, undefined, 2)", JSON.stringify(user, undefined, 2), new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
// });

// prisma.mutation.createPost({
//   data: {
//     title: "Prisma post2",
//     body: "",
//     published: false,
//     author: {
//       connect: {
//         id: "ckav5wr9o001g085237slbfg1"
//       }
//     }
//   }
// }, '{ id title body published }').then((data) => {
//   console.log("[JONGMAN_LOG] data", data, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
//   return prisma.query.users(null, '{ id name email posts { id title } }')
// }).then((data) => {
//   console.log("[JONGMAN_LOG] data", data, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
// });
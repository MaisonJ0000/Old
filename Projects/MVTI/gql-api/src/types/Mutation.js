import {
  mutationType, arg, stringArg, intArg,
} from '@nexus/schema';
import bcrypt from 'bcryptjs';
import CustomError from '../utils/error';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = mutationType({
  definition(t) {
    t.field('signUp', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, args, ctx) => {
        const hashedPassword = await hashPassword(args.password);
        const existingUser = await ctx.prisma.user.findOne({
          where: {
            email: args.email,
          },
        });
        if (existingUser) {
          throw new CustomError('ExistingUser', { message: `Already existing email: ${args.email}` });
        }

        const user = await ctx.prisma.user.create({
          data: {
            ...args,
            password: hashedPassword,
          },
        });

        return {
          user,
          token: generateToken(user.id),
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email: args.email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${args.email}`);
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error('Invalid password');
        }
        return {
          user,
          token: generateToken(user.id),
        };
      },
    });

    t.field('updateUser', {
      type: 'User',
      args: {
        data: arg({
          type: 'UserUpdateInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const { data } = args;
        if (typeof data.password === 'string') {
          data.password = await hashPassword(data.password);
        }

        return ctx.prisma.user.update({
          where: { id: userId },
          data,
        });
      },
    });

    t.field('deleteUser', {
      type: 'User',
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });

        return ctx.prisma.user.delete({ where: { id: userId } });
      },
    });

    t.field('requestFriend', {
      type: 'FriendRequest',
      args: {
        friend: arg({
          type: 'UserWhereUniqueInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const friend = await ctx.prisma.user.findOne({ where: args.friend });
        const friendRequest = await ctx.prisma.friendRequest.create({
          data: {
            requestUserId: userId,
            targetUserId: friend.id,
          },
        });
        ctx.pubsub.publish('REQUEST_FRIEND', { friendRequest });
        return friendRequest;
      },
    });

    t.field('acceptFriend', {
      type: 'User',
      args: {
        requestId: intArg(),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const request = await ctx.prisma.friendRequest.findOne({
          where: { id: args.requestId },
        });
        if (!request) throw new Error('No friend request');
        if (request.targetUserId !== userId) throw new Error('Not my request');

        await ctx.prisma.friendRequest.update({
          where: { id: args.requestId },
          data: { isAccepted: true },
        });
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { friends: { connect: { id: request.requestUserId } } },
        });
        return ctx.prisma.user.update({
          where: { id: request.requestUserId },
          data: { friends: { connect: { id: userId } } },
        });
      },
    });

    t.field('createReview', {
      type: 'Review',
      args: {
        data: arg({
          type: 'ReviewCreateWithoutAuthorInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const isConnectingMovie = args.data.movie.connect;
        if (isConnectingMovie) {
          const isMovieExists = await ctx.prisma.movie.findOne({
            where: { id: args.data.movie.connect.id },
          });
          if (!isMovieExists) {
            throw new CustomError('NoMovie', { message: 'Unable to find movie' });
          }
        }

        return ctx.prisma.review.create({
          data: {
            ...args.data,
            author: { connect: { id: Number(userId) } },
          },
        });
      },
    });

    t.field('updateMovie', {
      type: 'Movie',
      args: {
        data: arg({
          type: 'MovieUpdateInput',
        }),
        where: arg({
          type: 'MovieWhereUniqueInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const movieExists = await ctx.prisma.movie.findOne({
          where: { id: args.where.id, author: { id: userId } },
        });

        if (!movieExists) {
          throw new Error('Unable to update movie');
        }

        return ctx.prisma.movie.update({
          where: { id: args.where.id },
          data: args.data,
        });
      },
    });

    t.field('deleteMovie', {
      type: 'Movie',
      args: {
        where: arg({
          type: 'MovieWhereUniqueInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const movieExists = await ctx.prisma.movie.findOne({
          where: { id: args.where.id, author: { id: userId } },
        });

        if (!movieExists) {
          throw new Error('Unable to delete movie');
        }

        return ctx.prisma.movie.delete({ where: { id: args.where.id } });
      },
    });

    t.field('updateReview', {
      type: 'Review',
      args: {
        data: arg({
          type: 'ReviewUpdateInput',
        }),
        where: arg({
          type: 'ReviewWhereUniqueInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const reviewExists = await ctx.prisma.review.findOne({
          where: { id: args.where.id, author: { id: userId } },
        });

        if (!reviewExists) {
          throw new Error('Unable to update review');
        }

        return ctx.prisma.review.update({
          where: { id: args.where.id },
          data: args.data,
        });
      },
    });

    t.field('deleteReview', {
      type: 'Review',
      args: {
        where: arg({
          type: 'ReviewWhereUniqueInput',
        }),
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId({ request: ctx.request });
        const reviewExists = await ctx.prisma.review.findOne({
          where: { id: args.where.id, author: { id: userId } },
        });

        if (!reviewExists) {
          throw new Error('Unable to delete review');
        }

        return ctx.prisma.review.delete({ where: { id: args.where.id } });
      },
    });

    t.crud.createOneUser();
    t.crud.createOneMovie();
    t.crud.createOneReview();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();
    t.crud.updateOneReview();
    t.crud.updateOneMovie();
    t.crud.deleteOneReview();
    t.crud.deleteOneMovie();
    t.crud.updateManyUser();
    t.crud.createOneFriendRequest();
  },
});

export { Mutation as default };

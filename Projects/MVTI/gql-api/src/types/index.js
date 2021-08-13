import _ from 'lodash';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import AuthPayload from './AuthPayload';
import User from './User';
import Review from './Review';
import Movie from './Movie';
import FriendRequest from './FriendRequest';
import * as Args from './Args';

const types = [
  Query,
  Mutation,
  Subscription,
  AuthPayload,
  User,
  Review,
  Movie,
  FriendRequest,
  ..._.values(Args),
];

export { types as default };

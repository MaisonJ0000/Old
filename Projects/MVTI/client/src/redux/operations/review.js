import { gql } from '@apollo/client';
import _ from 'lodash';
import getGqlClient from '../utils/getGqlClient';
import movieOperations from './movie';

const client = getGqlClient();

const gqlMutationCreateReview = gql`
  mutation createReview($data: ReviewCreateWithoutAuthorInput) {
    createReview(data: $data) {
      id
      rating
      text
      movie {
        id
        titleKr
        poster
      }
    }
  }
`;

const addReview = async (review) => {
  const { movie } = review;
  if (!movie.titleKr) {
    throw new Error('invalid movie title');
  }
  const query = {
    where: {
      titleKr: {
        equals: movie.titleKr,
      },
    },
  };
  const existingMovies = await movieOperations.getMovies(query);
  const movieQuery = existingMovies.length ? {
    connect: {
      id: _.head(existingMovies).id,
    },
  } : {
    create: {
      titleKr: movie.titleKr,
      poster: movie.poster,
    },
  };
  const data = _.assign(review, { movie: movieQuery });
  const result = await client.mutate({
    mutation: gqlMutationCreateReview,
    variables: { data },
  });
  return _.get(result, 'data.createReview');
};

const reviewOperations = {
  addReview,
};

export default reviewOperations;

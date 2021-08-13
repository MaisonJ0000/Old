import _ from 'lodash';
import axios from 'axios';
import { gql } from '@apollo/client';
import config from '../../../.config';
import getGqlClient from '../utils/getGqlClient';
import userOperations from './user';

const client = getGqlClient();

const gqlQueryMovie = gql`
  query movie($where: MovieWhereUniqueInput!) {
    movie(where: $where) {
      id
      titleKr
      poster
    }
  }
`;

const getMovie = async (query) => {
  const where = query;
  const result = await client.query({
    query: gqlQueryMovie,
    variables: { where },
  });
  return _.get(result, 'data.movie');
};

const gqlQueryMovies = gql`
  query movies($where: MovieWhereInput) {
    movies(where: $where) {
      id
      titleKr
      poster
    }
  }
`;

const getMovies = async (query) => {
  const { where, orderBy, skip } = query;
  const result = await client.query({
    query: gqlQueryMovies,
    variables: { where, orderBy, skip },
  });
  return _.get(result, 'data.movies');
};

const getMyMovies = async () => {
  const me = await userOperations.me();
  const query = {
    where: {
      reviews: { some: { authorId: { equals: me.id } } },
    },
  };
  const result = await getMovies(query);
  return result;
};

const getKoficMovies = async (query) => {
  const renamedParamFromQuery = {
    title: 'movieNm',
  };
  const VALID_QUERY_KEYS = ['title'];

  let url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=430156241533f1d058c603178cc3ca0e';
  const parsedQuery = _(query)
    .pick(VALID_QUERY_KEYS)
    .map((val, key) => `${renamedParamFromQuery[key]}=${val}`)
    .value();
  const queryString = parsedQuery.length ? `&${_.join(parsedQuery, '&')}` : '';
  url += queryString;
  const res = await axios.get(url);
  return res;
};

const getImdbMoviesFromKoficMovies = async (koficMovies) => {
  const keyRenameMap = {
    movieNm: 'titleKr',
    Poster: 'poster',
    repGenreNm: 'genre',
    imdbRating: 'imdbRating',
  };
  const results = await Promise.all(_.map(koficMovies, async (koficMovie) => {
    if (!koficMovie.movieNmEn) return {};
    let url = `http://www.omdbapi.com/?apikey=${config.apiKey.omdb}`;
    url += `&t=${encodeURIComponent(koficMovie.movieNmEn)}`;
    const { data } = await axios.get(url);

    const merged = _.assign(data, koficMovie);
    const keyRenamedMerged = _.mapKeys(merged, (val, key) => keyRenameMap[key] || key);
    return keyRenamedMerged;
  }));
  const movies = _.filter(results, (result) => result.imdbID);
  return movies;
};

const movieOperations = {
  getMovie,
  getMovies,
  getMyMovies,
  getKoficMovies,
  getImdbMoviesFromKoficMovies,
};

export default movieOperations;

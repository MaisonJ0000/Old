import {
  call, put, takeEvery, takeLatest, fork,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import movieOperations from '../operations/movie';

// Action Types
export const GET_MOVIES_REQUEST = 'redux/movie/GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'redux/movie/GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'redux/movie/GET_MOVIES_FAILURE';
export const GET_KOFIC_MOVIES_REQUEST = 'redux/movie/GET_KOFIC_MOVIES_REQUEST';
export const GET_KOFIC_MOVIES_SUCCESS = 'redux/movie/GET_KOFIC_MOVIES_SUCCESS';
export const GET_KOFIC_MOVIES_FAILURE = 'redux/movie/GET_KOFIC_MOVIES_FAILURE';
export const GET_IMDB_MOVIES_REQUEST = 'redux/movie/GET_IMDB_MOVIES_REQUEST';
export const GET_IMDB_MOVIES_SUCCESS = 'redux/movie/GET_IMDB_MOVIES_SUCCESS';
export const GET_IMDB_MOVIES_FAILURE = 'redux/movie/GET_IMDB_MOVIES_FAILURE';

// Action Creators
export const fetchMovies = () => ({ type: GET_MOVIES_REQUEST });
export const fetchKoficMovies = (query) => ({ type: GET_KOFIC_MOVIES_REQUEST, query });

// Saga
function* fetchMoviesGenerator() {
  try {
    const movies = yield call(movieOperations.getMyMovies);
    yield put({ type: GET_MOVIES_SUCCESS, payload: movies });
  } catch (e) {
    yield put({ type: GET_MOVIES_FAILURE, payload: e });
  }
}

function* watchFetchMoviesGenerator() {
  yield takeEvery(GET_MOVIES_REQUEST, fetchMoviesGenerator);
}

function* fetchKoficMoviesGenerator(action) {
  const { query } = action;
  try {
    const { data: koficMoviesResult } = yield call(movieOperations.getKoficMovies, query);
    yield put({ type: GET_KOFIC_MOVIES_SUCCESS, payload: koficMoviesResult });
    const koficMovies = _.get(koficMoviesResult, 'movieListResult.movieList', []);
    yield put({ type: GET_IMDB_MOVIES_REQUEST, koficMovies });
  } catch (e) {
    yield put({ type: GET_KOFIC_MOVIES_FAILURE, payload: e });
  }
}

function* watchFetchKoficMoviesGenerator() {
  yield takeLatest(GET_KOFIC_MOVIES_REQUEST, fetchKoficMoviesGenerator);
}

function* fetchImdbMoviesGenerator(action) {
  const { koficMovies } = action;
  try {
    const imdbMovies = yield call(movieOperations.getImdbMoviesFromKoficMovies, koficMovies);
    yield put({ type: GET_IMDB_MOVIES_SUCCESS, payload: imdbMovies });
  } catch (e) {
    yield put({ type: GET_IMDB_MOVIES_FAILURE, payload: e });
  }
}

function* watchFetchImdbMoviesGenerator() {
  yield takeLatest(GET_IMDB_MOVIES_REQUEST, fetchImdbMoviesGenerator);
}

export const movieSagas = [
  fork(watchFetchMoviesGenerator),
  fork(watchFetchKoficMoviesGenerator),
  fork(watchFetchImdbMoviesGenerator),
];

const initialState = fromJS({
  movies: [],
  koficMovies: [],
  imdbMovies: {
    isLoading: false,
    movies: [],
  },
});

// Reducer Functions
const applyFetchMovies = (prevState, movies) => (prevState.setIn(['movies'], fromJS(movies)));
const applyFetchKoficMovies = (prevState, koficMovies) => prevState.setIn(['koficMovies'], fromJS(koficMovies));
const applyFetchImdbMovies = (prevState, imdbMovies) => prevState.setIn(['imdbMovies'], fromJS({
  isLoading: false,
  movies: imdbMovies,
}));
const applyIsLoadingImdbMovies = (prevState, isLoading) => prevState.setIn(['imdbMovies', 'isLoading'], fromJS(isLoading));

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_SUCCESS: {
      const movies = action.payload;
      return applyFetchMovies(state, movies);
    }
    case GET_KOFIC_MOVIES_REQUEST: {
      const loading = true;
      return applyIsLoadingImdbMovies(state, loading);
    }
    case GET_KOFIC_MOVIES_FAILURE: {
      const loading = false;
      return applyIsLoadingImdbMovies(state, loading);
    }
    case GET_IMDB_MOVIES_FAILURE: {
      const loading = false;
      return applyIsLoadingImdbMovies(state, loading);
    }
    case GET_KOFIC_MOVIES_SUCCESS: {
      const { movieListResult: koficMovies } = action.payload;
      return applyFetchKoficMovies(state, koficMovies);
    }
    case GET_IMDB_MOVIES_SUCCESS: {
      const imdbMovies = action.payload;
      return applyFetchImdbMovies(state, imdbMovies);
    }
    default:
      return state;
  }
};

export default reducer;

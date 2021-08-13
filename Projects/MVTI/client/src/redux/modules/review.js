import {
  call, put, takeEvery, fork,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import reviewOperations from '../operations/review';

// Action Types
export const ADD_REVIEW_REQUEST = 'redux/review/ADD_REVIEW_REQUEST';
export const ADD_REVIEW_SUCCESS = 'redux/review/ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'redux/review/ADD_REVIEW_FAILURE';
export const RESET_ADD_REVIEW_REQUEST = 'redux/review/RESET_ADD_REVIEW_REQUEST';

// Action Creators
export const addReview = (review) => ({ type: ADD_REVIEW_REQUEST, review });
export const resetAddReview = () => ({ type: RESET_ADD_REVIEW_REQUEST });

// Saga
function* addReviewGenerator(action) {
  const { review } = action;
  try {
    const createdReview = yield call(reviewOperations.addReview, review);
    yield put({ type: ADD_REVIEW_SUCCESS, payload: createdReview });
  } catch (e) {
    console.error(e);
    yield put({ type: ADD_REVIEW_FAILURE, payload: e });
  }
}

function* watchAddReviewGenerator() {
  yield takeEvery(ADD_REVIEW_REQUEST, addReviewGenerator);
}

export const reviewSagas = [
  fork(watchAddReviewGenerator),
];

const initialState = fromJS({
  createdReview: {
    isLoading: false,
    review: null,
  },
});

// Reducer Functions
const applyAddReview = (prevState, review) => (prevState.setIn(['createdReview'], fromJS({
  isLoading: false,
  review,
})));
const applyIsLoadingAddReview = (prevState, isLoading) => prevState.setIn(['createdReview', 'isLoading'], fromJS(isLoading));
const applyResetAddReview = (prevState) => (prevState.setIn(['createdReview', 'review'], fromJS(null)));

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS: {
      const review = action.payload;
      return applyAddReview(state, review);
    }
    case ADD_REVIEW_REQUEST: {
      const loading = true;
      return applyIsLoadingAddReview(state, loading);
    }
    case ADD_REVIEW_FAILURE: {
      const loading = false;
      return applyIsLoadingAddReview(state, loading);
    }
    case RESET_ADD_REVIEW_REQUEST: {
      return applyResetAddReview(state);
    }
    default:
      return state;
  }
};

export default reducer;

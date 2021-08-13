import { all } from 'redux-saga/effects';
import { userSagas } from './modules/user';
import { movieSagas } from './modules/movie';
import { reviewSagas } from './modules/review';
import { friendSagas } from './modules/friend';

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...movieSagas,
    ...reviewSagas,
    ...friendSagas,
  ]);
}

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import user from './modules/user';
import movie from './modules/movie';
import review from './modules/review';
import friend from './modules/friend';

const rootReducer = combineReducers({
  user,
  movie,
  review,
  friend,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;

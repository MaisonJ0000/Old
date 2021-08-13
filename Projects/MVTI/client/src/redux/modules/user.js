import {
  call, put, takeEvery, fork,
} from 'redux-saga/effects';

import Cookies from 'js-cookie';

import { fromJS } from 'immutable';
import getGqlClient from '../utils/getGqlClient';
import userOperations from '../operations/user';

const client = getGqlClient();

// Action Types
export const SIGN_UP_REQUEST = 'redux/user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'redux/user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'redux/user/SIGN_UP_FAILURE';
export const LOGIN_REQUEST = 'redux/user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'redux/user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'redux/user/LOGIN_FAILURE';
export const LOGOUT = 'redux/user/LOGOUT';
export const GET_USERS_REQUEST = 'redux/user/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'redux/user/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'redux/user/GET_USERS_FAILURE';

// Action Creators
export const fetchUsers = () => ({ type: GET_USERS_REQUEST });
export const signUp = (opts) => ({ type: SIGN_UP_REQUEST, user: opts });
export const login = (opts) => ({ type: LOGIN_REQUEST, user: opts });
export const logout = () => ({ type: LOGOUT });

// Saga
export const createUserApi = (value) => {
  const { name, email, password } = value;

  return client.mutate({
    variables: { name, email, password },
    mutation: userOperations.createUser,
  }).then((response) => response);
};

export const doLoginApi = (payload) => {
  const { email, password } = payload;

  return client.mutate({
    variables: { email, password },
    mutation: userOperations.login,
  }).then((response) => response);
};

export const storeToken = (loggedInUser) => {
  const { user, token } = loggedInUser;

  Cookies.set('user_email', user.email, { expires: 7 });
  Cookies.set('token', token, { expires: 7 });
};

export function* fetchUsersGenerator() {
  try {
    const users = yield call(userOperations.getUsers);
    yield put({ type: GET_USERS_SUCCESS, payload: users });
  } catch (e) {
    console.log('error', e);
    yield put({ type: GET_USERS_FAILURE, payload: e });
  }
}

export function* doSignupGenerator(action) {
  const { user } = action;
  try {
    const signedUpUser = yield call(userOperations.doSignUp, user);
    yield put({ type: SIGN_UP_SUCCESS, payload: signedUpUser });
  } catch (e) {
    console.error('error', e);
    yield put({ type: SIGN_UP_FAILURE, payload: e });
  }
}

export function* doLoginGenerator(action) {
  const { user } = action;
  try {
    const loggedInUser = yield call(userOperations.doLogin, user);
    yield call(storeToken, loggedInUser);
    yield put({ type: LOGIN_SUCCESS, payload: loggedInUser });
  } catch (e) {
    console.log('error', e);
    yield put({ type: LOGIN_FAILURE, payload: e });
  }
}

function* watchFetchUsersGenerator() {
  yield takeEvery(GET_USERS_REQUEST, fetchUsersGenerator);
}

function* watchSignUpGenerator() {
  yield takeEvery(SIGN_UP_REQUEST, doSignupGenerator);
}

function* watchLoginGenerator() {
  yield takeEvery(LOGIN_REQUEST, doLoginGenerator);
}

export const userSagas = [fork(watchFetchUsersGenerator),
  fork(watchSignUpGenerator), fork(watchLoginGenerator)];

const initialState = fromJS({
  me: {
    email: '',
    isLogged: false,
  },
  users: [],
  newUser: '',
});

// Reducer Functions
const applyFetchUsersSuccess = (prevState, users) => prevState.setIn(['users'], fromJS(users));
const applyNewUserState = (prevState, newUser) => prevState.set('newUser', fromJS(newUser));
const applyLoginUserState = (prevState, me) => prevState.set('me', fromJS(me));

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      const users = action.payload;
      return applyFetchUsersSuccess(state, users);
    }
    case SIGN_UP_SUCCESS: {
      const signedUpUser = action.payload;
      return applyNewUserState(state, signedUpUser.user);
    }
    case LOGIN_SUCCESS: {
      const loggedInUser = action.payload;
      const me = { email: loggedInUser.user.email, isLogged: true };
      return applyLoginUserState(state, me);
    }
    case LOGOUT: {
      const meInitial = {
        email: '',
        isLogged: false,
      };

      return applyLoginUserState(state, meInitial);
    }
    default:
      return state;
  }
};

export default reducer;

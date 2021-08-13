import {
  call, put, takeEvery, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import { eventChannel } from 'redux-saga';
import { fromJS } from 'immutable';
import friendOperations from '../operations/friend';
import userOperations from '../operations/user';

// Action Types
export const SUBSCRIBE_FRIEND_REQUEST_REQUEST = 'redux/friend/SUBSCRIBE_FRIEND_REQUEST_REQUEST';
export const SUBSCRIBE_FRIEND_REQUEST_SUCCESS = 'redux/friend/SUBSCRIBE_FRIEND_REQUEST_SUCCESS';
export const SUBSCRIBE_FRIEND_REQUEST_FAILURE = 'redux/friend/SUBSCRIBE_FRIEND_REQUEST_FAILURE';

// Action Creators
export const subscribeFriendRequestToMe = () => ({
  type: SUBSCRIBE_FRIEND_REQUEST_REQUEST,
  acceptsRequestsToMeOnly: true,
});

// Saga
const createEventChannel = (observable) => eventChannel((emitter) => {
  const subscription = observable.subscribe({
    next(value) {
      emitter(value);
    },
  });
  return () => {
    subscription.unsubscribe();
  };
});

function* handleFriendRequestEvent(payload) {
  const friendRequest = _.get(payload, 'data.friendRequest', {
    requestUserId: undefined,
  });
  const requestUser = yield call(userOperations.getUserById, friendRequest.requestUserId);
  friendRequest.requestUser = requestUser;
  yield put({ type: SUBSCRIBE_FRIEND_REQUEST_SUCCESS, payload: friendRequest });
}

export function* subscribeFriendRequestGenerator(action) {
  const { acceptsRequestsToMeOnly } = action;
  try {
    const friendRequestObservable = yield call(
      friendOperations.subscribeFriendRequest,
      acceptsRequestsToMeOnly,
    );
    const friendRequestChannel = yield call(createEventChannel, friendRequestObservable);
    yield takeEvery(friendRequestChannel, handleFriendRequestEvent);
  } catch (e) {
    console.log('error', e);
    yield put({ type: SUBSCRIBE_FRIEND_REQUEST_FAILURE, payload: e });
  }
}

function* watchSubscribeFriendRequestGenerator() {
  yield takeEvery(SUBSCRIBE_FRIEND_REQUEST_REQUEST, subscribeFriendRequestGenerator);
}

export const friendSagas = [
  fork(watchSubscribeFriendRequestGenerator),
];

const initialState = fromJS({
  friendRequests: [],
  friendRequestAdded: {},
});

// Reducer Functions
const applySubscribeFriendRequest = (prevState, friendRequest) => prevState.setIn(['friendRequestAdded'], fromJS(friendRequest));

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_FRIEND_REQUEST_SUCCESS: {
      const friendRequest = action.payload;
      return applySubscribeFriendRequest(state, friendRequest);
    }
    default:
      return state;
  }
};

export default reducer;

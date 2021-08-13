import 'babel-polyfill';
import { call, put } from 'redux-saga/effects';

import {
  fetchUsersApi, fetchUsersGenerator, GET_USERS_SUCCESS, GET_USERS_FAILURE,
} from './user';

describe('user Saga test', () => {
  test('fetchUsersGenerator success Saga test', () => {
    const gen = fetchUsersGenerator();
    const mockUsers = ['a', 'b', 'c'];

    expect(gen.next().value)
      .toStrictEqual(call(fetchUsersApi));
    expect(gen.next({ data: mockUsers }).value)
      .toStrictEqual(put({ type: GET_USERS_SUCCESS, payload: mockUsers }));
    expect(gen.next().done)
      .toBeTruthy();
  });

  test('fetchUsersGenerator failure Saga test', () => {
    const gen = fetchUsersGenerator();
    const mockError = 'not found';

    expect(gen.next().value)
      .toStrictEqual(call(fetchUsersApi));
    expect(gen.throw(mockError).value)
      .toStrictEqual(put({ type: GET_USERS_FAILURE, payload: mockError }));
    expect(gen.next().done)
      .toBeTruthy();
  });
});

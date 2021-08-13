import axios from 'axios';
import getGqlClient from './utils/getGqlClient';
import { getContinents } from "./operations/continent";

const client = getGqlClient();

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async dispatch => {
  const res = await axios.get('https://react-ssr-api.herokuapp.com/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CONTINIENTS = 'fetch_continents';
export const fetchContinents = () => async dispatch => {
  const res = await client.query({
    query: getContinents,
  });

  dispatch({
    type: FETCH_CONTINIENTS,
    payload: res
  });
};
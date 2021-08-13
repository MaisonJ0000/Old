import React from 'react';
import Home from './components/Home';
import UsersList, { loadData as loadUsersData } from './components/UsersList';
import ContinentsList, { loadData as loadContinentsData } from "./components/ContinentsList";

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    loadData: loadUsersData,
    path: '/users',
    component: UsersList
  },
  {
    loadData: loadContinentsData,
    path: '/continents',
    component: ContinentsList
  }
];
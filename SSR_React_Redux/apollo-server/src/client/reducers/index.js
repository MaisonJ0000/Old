import { combineReducers } from "redux";
import usersReducer from './usersReducer';
import continentsReducer from "./continentsReducer";

export default combineReducers({
  users: usersReducer,
  continents: continentsReducer,
});
import { FETCH_CONTINIENTS } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CONTINIENTS:
      return action.payload.data.continents;
    default:
      return state;
  }
}
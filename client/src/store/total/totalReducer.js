import { ADD_TOTAL, SUBTRACT_TOTAL } from "./actionTypes";

let initialState = 0;
export default function createTotalReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TOTAL: {
      return state + action.payload
    }

    case SUBTRACT_TOTAL: {
      return state - action.payload
    }
    default:
      return state;
  }
}
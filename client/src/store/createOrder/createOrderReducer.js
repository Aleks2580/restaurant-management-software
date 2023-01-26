import { GET_TABLE, RESET_TABLE } from "./actionTypes";

let initialState = null
export default function createOrderReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TABLE: {
      // return [...state, action.payload]
      return action.payload
    }
    default:
      return state;
  }
}
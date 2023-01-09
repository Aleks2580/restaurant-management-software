import { GET_TABLE } from "./actionTypes";

let initialState = null
export default function createOrderReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TABLE: {
      return action.payload
    }
    default:
      return state;
  }
}
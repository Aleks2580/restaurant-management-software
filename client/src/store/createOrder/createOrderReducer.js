import { GET_TABLE } from "./actionTypes";

let initialState = []
export default function createOrderReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TABLE: {
      return [...state, action.payload]
    }
    default:
      return state;
  }
}
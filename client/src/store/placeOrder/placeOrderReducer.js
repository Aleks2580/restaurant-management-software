import { PLACE_ORDER, ORDERED } from "./actionTypes";

const initialState = []

export default function placeOrderReducer (state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER: {
      return [...state, action.payload];
    }
    case ORDERED: {
      return {}
    }
    default:
      return state;
  }
}
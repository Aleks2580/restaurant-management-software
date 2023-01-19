import { PLACE_ORDER, DELETE_ITEM, ORDERED } from "./actionTypes";

const initialState = []

export default function placeOrderReducer (state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER: {
      return [...state, action.payload];
    }
    case ORDERED: {
      return {}
    }
    case DELETE_ITEM: {
      return state.filter((el) => state.indexOf(el) !== action.payload)
    }
    default:
      return state;
  }
}
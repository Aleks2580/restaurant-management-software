import { GET_PRODUCT_TO_EDIT, DONE_EDITING } from "./actionTypes";

const initialState = {};

export default function editProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_TO_EDIT: {
      return action.payload;
    }
    case DONE_EDITING: {
      return {};
    }
    default:
      return state;
  }
}

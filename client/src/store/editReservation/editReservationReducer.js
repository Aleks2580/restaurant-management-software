import { GET_RESERVATION_TO_EDIT, DONE_EDITING } from "./actionTypes";

const initialState = {}

export default function editReservationReducer (state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATION_TO_EDIT: {
      return action.payload;
    }
    case DONE_EDITING: {
      return {}
    }
    default:
      return state;
  }
}


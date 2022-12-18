import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

const initialState = {}

export default function loginUserReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return {}
    }
    default:
      return state;
  }
}
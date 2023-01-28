import { TABLE_NUMBER } from "./actionTypes";

const initialState = null

export default function tableNumber (state = initialState, action) {
  switch (action.type) {
    case TABLE_NUMBER: {
      
      return action.payload;
    }
    default:
      return state;
  }
}
import { combineReducers } from "redux";
import editUserReducer from "./editUser/editUserReducer";
import loginUserReducer from "./loginUser/loginUserReducer";
import editReservationReducer from "./editReservation/editReservationReducer";
import createOrderReducer from "./createOrder/createOrderReducer";
import placeOrderReducer from "./placeOrder/placeOrderReducer";
import totalReducer from "./total/totalReducer";
import viewOrderReducer from "./viewOrder/viewOrderReducer";
import editProductReducer from "./editProduct/editProductReducer";

export default combineReducers({
  editUser: editUserReducer,
  loginUser: loginUserReducer,
  editReservation: editReservationReducer,
  createOrder: createOrderReducer,
  placeOrder: placeOrderReducer,
  total: totalReducer,
  viewOrder: viewOrderReducer,
  editProduct: editProductReducer,
});

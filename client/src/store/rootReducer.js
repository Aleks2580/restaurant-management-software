import { combineReducers } from 'redux';
import editUserReducer from './editUser/editUserReducer';
import loginUserReducer from './loginUser/loginUserReducer';
import editReservationReducer from './editReservation/editReservationReducer';
import createOrderReducer from './createOrder/createOrderReducer';

export default combineReducers({
  editUser: editUserReducer,
  loginUser: loginUserReducer,
  editReservation: editReservationReducer,
  createOrder: createOrderReducer,
 
});
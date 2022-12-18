import { combineReducers } from 'redux';
import editUserReducer from './editUser/editUserReducer';
import loginUserReducer from './loginUser/loginUserReducer';


export default combineReducers({
  editUser: editUserReducer,
  loginUser: loginUserReducer,
 
});
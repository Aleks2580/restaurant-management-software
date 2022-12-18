import { combineReducers } from 'redux';
import editUserReducer from './editUser/editUserReducer';


export default combineReducers({
  editUser: editUserReducer,
 
});
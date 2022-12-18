import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"

export function loginUser(objectUser) {
  return {type: LOGIN_USER, payload: objectUser}
}

export function logoutUser() {
  return {type: LOGOUT_USER}
}

import { GET_USER_TO_EDIT, DONE_EDITING } from "./actionTypes"

export function editUser(objectUser) {
  return {type: GET_USER_TO_EDIT, payload: objectUser}
}

export function doneEditing() {
  return {type: DONE_EDITING}
}


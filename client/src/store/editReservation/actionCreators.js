import { GET_RESERVATION_TO_EDIT, DONE_EDITING } from "./actionTypes"

export function editReservation(objectUser) {
  return {type: GET_RESERVATION_TO_EDIT, payload: objectUser}
}

export function doneEditing() {
  return {type: DONE_EDITING}
}

import { GET_RESERVATION_TO_EDIT, DONE_EDITING } from "./actionTypes"

export function editReservation(objectReservation) {
  return {type: GET_RESERVATION_TO_EDIT, payload: objectReservation}
}

export function doneEditing() {
  return {type: DONE_EDITING}
}

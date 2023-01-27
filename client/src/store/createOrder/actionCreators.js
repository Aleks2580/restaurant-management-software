import {GET_TABLE, RESET_TABLE} from "./actionTypes"

export function getTable(tableNumber) {
  return {type: GET_TABLE, payload: tableNumber}
}

export function resetTable() {
  return {type: RESET_TABLE}
}
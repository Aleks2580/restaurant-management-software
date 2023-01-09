import {GET_TABLE} from "./actionTypes"

export function getTable(tableNumber) {
  return {type: GET_TABLE, payload: tableNumber}
}
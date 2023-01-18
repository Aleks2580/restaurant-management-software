import {ADD_TOTAL} from "./actionTypes"

export function addTotal(num) {
  return {type: ADD_TOTAL, payload: num}
}
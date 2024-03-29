import {ADD_TOTAL, SUBTRACT_TOTAL, RESET_TOTAL} from "./actionTypes"

export function addTotal(num) {
  return {type: ADD_TOTAL, payload: num}
}

export function subtractTotal(num) {
  return {type: SUBTRACT_TOTAL, payload: num}
}

export function resetTotal() {
  return {type: RESET_TOTAL}
}
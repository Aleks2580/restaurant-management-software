import { PLACE_ORDER, DELETE_ITEM, ORDERED, ADD_ITEM, SUBTR_ITEM } from "./actionTypes"

export function placeOrder(objectOrder) {
  return {type: PLACE_ORDER, payload: objectOrder}
}

export function deleteItem(index) {
  return {type: DELETE_ITEM, payload: index}
}

export function addItem(index) {
  return {type: ADD_ITEM, payload: index}
}

export function subtractItem(index) {
  return {type: SUBTR_ITEM, payload: index}
}

export function ordered() {
  return {type: ORDERED}
}

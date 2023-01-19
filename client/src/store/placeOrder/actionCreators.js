import { PLACE_ORDER, DELETE_ITEM, ORDERED } from "./actionTypes"

export function placeOrder(objectOrder) {
  return {type: PLACE_ORDER, payload: objectOrder}
}

export function deleteItem(index) {
  return {type: DELETE_ITEM, payload: index}
}

export function ordered() {
  return {type: ORDERED}
}

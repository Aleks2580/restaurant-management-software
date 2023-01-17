import { PLACE_ORDER, ORDERED } from "./actionTypes"

export function placeOrder(objectOrder) {
  return {type: PLACE_ORDER, payload: objectOrder}
}

export function ordered() {
  return {type: ORDERED}
}

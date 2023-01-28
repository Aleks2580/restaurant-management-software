import { TABLE_NUMBER } from "./actionTypes"

export function tableNumber(number) {
  return {type: TABLE_NUMBER, payload: number}
}
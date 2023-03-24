import { GET_PRODUCT_TO_EDIT, DONE_EDITING } from "./actionTypes";

export function editProduct(objectProduct) {
  return { type: GET_PRODUCT_TO_EDIT, payload: objectProduct };
}

export function doneEditing() {
  return { type: DONE_EDITING };
}

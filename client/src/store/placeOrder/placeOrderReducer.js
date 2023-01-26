import { PLACE_ORDER, DELETE_ITEM, ORDERED, ADD_ITEM, SUBTR_ITEM } from "./actionTypes";

const initialState = []

export default function placeOrderReducer (state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER: {
      
      return [...state, action.payload];
    }
    case ORDERED: {
      return []
    }
    case DELETE_ITEM: {
      return state.filter((el) => state.indexOf(el) !== action.payload)
    }
    case ADD_ITEM: {

      const changedItemIndex = action.payload;
      
      const newItem = state.map((item,index) => {
        if (index === changedItemIndex) {
          return {...item, quantity: item.quantity + 1}
        }
         return item;
      })
     return newItem;
      }
  
    case SUBTR_ITEM: {
      const changedItemIndex = action.payload;
      
      const newItem = state.map((item,index) => {
        if (index === changedItemIndex) {
          return {...item, quantity: item.quantity - 1}
        }
         return item;
      })
     return newItem;
    }
    
    default:
      return state;
  }
}
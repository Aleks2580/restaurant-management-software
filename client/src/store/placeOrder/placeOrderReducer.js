import { PLACE_ORDER, DELETE_ITEM, ORDERED, ADD_ITEM, SUBTR_ITEM } from "./actionTypes";

const initialState = []

export default function placeOrderReducer (state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER: {
      // let result = state.reduce((finalArray,current) => {
      //   let obj = finalArray.find(item => item.item === current.item);

      //   if(obj) {
      //     return finalArray
      //   } else {
      //     return finalArray.concat([current])
      //   }
      // },[])
      // let result = state.map((el) => {
      //   if(el.name === action.payload.name) {
      //     el.quantity ++
      //   } else {
      //     return action.payload
      //   }
      
      return [...state, action.payload];
    }
    case ORDERED: {
      return {}
    }
    case DELETE_ITEM: {
      return state.filter((el) => state.indexOf(el) !== action.payload)
    }
    case ADD_ITEM: {

      let obj = [...state];
      obj.map((el,i) => {
        if (i === action.payload) {
          el.quantity ++;
          
        }
        return el;
      });

      return [...state];
    }
    case SUBTR_ITEM: {
      let obj = [...state];
      obj.map((el,i) => {
        if (i === action.payload) {
          el.quantity --;
          
        }
        return el;
      });

      return [...state];
    }
    
    default:
      return state;
  }
}
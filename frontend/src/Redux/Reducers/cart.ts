import { PayloadAction } from "@reduxjs/toolkit";
import { MyCart, products } from "../Interfaces";
import { ADD_TO_CART, EMPTY_CART } from "../ActionType/products";

const inizialState: MyCart = {
  allProducts: [],
};

export const cartReducer = (
  state = inizialState,
  action: PayloadAction<products>
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    case EMPTY_CART:
      return {
        ...state,
        allProducts: [],
      };
    default:
      return state;
  }
};

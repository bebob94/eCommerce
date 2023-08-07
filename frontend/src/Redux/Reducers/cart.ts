import { PayloadAction } from "@reduxjs/toolkit";
import { MyCart, products } from "../Interfaces";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  allProducts,
} from "../ActionType/products";

const inizialState: MyCart = {
  allProducts: [],
  quantity: [],
};

export const cartReducer = (
  state = inizialState,
  action: PayloadAction<{ product: products; quantity: number }>
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload.product],
        quantity: [...state.quantity, action.payload.quantity],
      };
    case EMPTY_CART:
      return {
        ...state,
        allProducts: [],
        quantity: [],
      };
    case REMOVE_FROM_CART:
      const objToRemove = action.payload;
      return {
        ...state,
        ...state.allProducts,
        allProducts: state.allProducts.filter(
          (product) => product.id !== objToRemove.product.id
        ),
      };
    default:
      return state;
  }
};

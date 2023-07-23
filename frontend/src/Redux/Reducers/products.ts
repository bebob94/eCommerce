import { PayloadAction } from "@reduxjs/toolkit";
import { MyProduct, products } from "../Interfaces";
import {
  ALL_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  PRODUCT_BY_ID,
} from "../ActionType/products";

const inizialState: MyProduct = {
  AllProducts: [],
  product: {} as products,
};

export const ProductsReducer = (
  state = inizialState,
  action: PayloadAction<products[] | products>
) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        AllProducts: action.payload as products[],
      };
    case PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        AllProducts: action.payload as products[],
      };
    case PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload as products,
      };

    default:
      return state;
  }
};

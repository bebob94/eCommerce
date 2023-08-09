import { PayloadAction } from "@reduxjs/toolkit";
import { MyCart, products } from "../Interfaces";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
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
      const existingProductIndex = state.allProducts.findIndex(
        (product) => product.id === action.payload.product.id
      );

      if (existingProductIndex !== -1) {
        // Il prodotto esiste già nel carrello
        const newQuantity =
          state.quantity[existingProductIndex] + action.payload.quantity;

        return {
          ...state,
          quantity: [
            ...state.quantity.slice(0, existingProductIndex),
            newQuantity,
            ...state.quantity.slice(existingProductIndex + 1),
          ],
        };
      } else {
        // Il prodotto non esiste nel carrello
        return {
          ...state,
          allProducts: [...state.allProducts, action.payload.product],
          quantity: [...state.quantity, action.payload.quantity],
        };
      }

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
    case UPDATE_QUANTITY:
      const { product, quantity } = action.payload;

      const productIndexToUpdate = state.allProducts.findIndex(
        (p) => p.id === product.id
      );

      if (productIndexToUpdate !== -1) {
        const maxQuantity = product.quantity; // Quantità massima dal database
        const updatedQuantity = Math.max(Math.min(quantity, maxQuantity), 0); // Assicurati di rispettare i limiti

        const updatedQuantities = state.quantity.map((q, index) =>
          index === productIndexToUpdate ? updatedQuantity : q
        );

        return {
          ...state,
          quantity: updatedQuantities,
        };
      } else {
        return state; // Prodotto non trovato, restituisci lo stato attuale
      }
    default:
      return state;
  }
};

import { PayloadAction } from "@reduxjs/toolkit";
import { OrderState, ShoppingOrderList } from "../Interfaces";
import { ORDER } from "../ActionType/order";

const initialState: OrderState = {
  order: [],
};
export const orderReducer = (
  state = initialState,
  action: PayloadAction<ShoppingOrderList[]>
) => {
  switch (action.type) {
    case ORDER:
      return {
        order: [...action.payload],
      };
    default:
      return state;
  }
};

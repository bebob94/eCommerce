import { PayloadAction } from "@reduxjs/toolkit";
import { MyAddress, address } from "../Interfaces";
import { ADDRESS, ALL_ADDRESSES } from "../ActionType/address";

const inizialState: MyAddress = {
  AllAddressesByUser: [],
  address: {} as address,
};

export const AddressReducer = (
  state = inizialState,
  action: PayloadAction<address[] | address>
) => {
  switch (action.type) {
    case ALL_ADDRESSES:
      return {
        ...state,
        AllAddressesByUser: action.payload as address[],
      };
    case ADDRESS:
      return {
        ...state,
        address: action.payload as address,
      };
    default:
      return state;
  }
};

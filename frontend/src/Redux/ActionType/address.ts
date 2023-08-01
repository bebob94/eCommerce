import { newAddress } from "../Interfaces";

export const ALL_ADDRESSES = "ALL_ADDRESSES";
export const ADDRESS_BY_ID = "ADDRESS_BY_ID";

export const allAddresses = async (token: string) => {
  try {
    let res = await fetch("http://localhost:8080/address/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      let data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const allAddressesByUser = async (token: string, userId: number) => {
  try {
    let res = await fetch(`http://localhost:8080/address/all/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      let data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RICERCA ADDRESS PER ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const addressById = async (value: Number | undefined, token: String) => {
  try {
    let res = await fetch(`http://localhost:8080/address/${value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      let data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< POST ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const postAddress = async (
  token: string,
  body: newAddress,
  userId: number
) => {
  try {
    let res = await fetch(`http://localhost:8080/address/add/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

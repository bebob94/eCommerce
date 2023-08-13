import { address, newAddress } from "../Interfaces";

export const ALL_ADDRESSES = "ALL_ADDRESSES";
export const ADDRESS = "ADDRESS";

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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MODIFICA ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const changeMyAddressInfo = async (params: address, token: String) => {
  const requestOptions = await fetch(`http://localhost:8080/address`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });
};
function RootState(a: unknown, b: unknown): boolean {
  throw new Error("Function not implemented.");
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DELETE ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const deleteAddress = async (id: number, token: String) => {
  const requestOptions = await fetch(`http://localhost:8080/address/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const PRODUCT_BY_ID = "PRODUCT_BY_ID";
export const PRODUCTS_BY_CATEGORY = "PRODUCTS_BY_CATEGORY";
export const ADD_TO_CART = "ADD_TO_CART";
export const EMPTY_CART = "EMPTY_CART";

export const allProducts = async (token: String) => {
  try {
    let res = await fetch(`http://localhost:8080/product/all`, {
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RICERCA PRODUCT PER ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const productById = async (value: Number | undefined, token: String) => {
  try {
    let res = await fetch(`http://localhost:8080/product/${value}`, {
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RICERCA PRODUCT PER CATEGORY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const productsByCategory = async (
  value: string | undefined,
  token: String
) => {
  try {
    let res = await fetch(`http://localhost:8080/product/category/${value}`, {
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RICERCA PRODUCT PER NOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const productByName = async (
  value: string | undefined,
  token: String
) => {
  try {
    let res = await fetch(`http://localhost:8080/product/name/${value}`, {
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

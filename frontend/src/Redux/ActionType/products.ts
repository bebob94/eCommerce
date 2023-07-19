export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const PRODUCT_BY_ID = "PRODUCT_BY_ID";

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
export const userById = async (value: Number | undefined, token: String) => {
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

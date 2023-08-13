export const ORDER = "ORDER";

export const getOrders = async (id: number, token: String) => {
  try {
    const res = await fetch(`http://localhost:8080/OrderList/${id}`, {
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

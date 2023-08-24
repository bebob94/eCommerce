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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< POST ORDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const postReviews = async (body: postReview, token: string) => {
  try {
    let res = await fetch(`http://localhost:8080/review/add`, {
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

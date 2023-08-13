import { postReview } from "../Interfaces";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< POST ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

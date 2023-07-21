import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_PRODUCTS,
  PRODUCT_BY_ID,
  allProducts,
  productById,
} from "../Redux/ActionType/products";
import { RootState } from "../Redux/Store";
import { products } from "../Redux/Interfaces";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state?.user.user);
  const products = useSelector(
    (state: RootState) => state?.products.AllProducts
  );
  const dispatch = useDispatch();

  const handleClick = async (id: Number) => {
    let data = await productById(id, user.accessToken);
    dispatch({
      type: PRODUCT_BY_ID,
      payload: data,
    });
  };

  useEffect(() => {
    (async () => {
      let data = await allProducts(user.accessToken);
      dispatch({
        type: ALL_PRODUCTS,
        payload: data,
      });
    })();
  }, []);

  return (
    <div className="flex justify-center flex-wrap my-5">
      {products
        .slice()
        .reverse()
        .map((product, i) => (
          <div
            key={i}
            className="w-1/4 ss:w-1/2 xs:w-full  m-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link
              to={`/product/${product.id}`}
              onClick={() => handleClick(product?.id)}
            >
              <img
                className="p-8 rounded-t-lg h-72 w-full"
                src={product.image}
                alt="product image"
              />
            </Link>

            <div className="px-5 pb-5">
              <Link to={`/product/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  {product.description}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;

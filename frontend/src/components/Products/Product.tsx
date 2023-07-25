import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useEffect } from "react";
import {
  PRODUCTS_BY_CATEGORY,
  productsByCategory,
} from "../../Redux/ActionType/products";

const Product = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user.user);
  const product = useSelector((state: RootState) => state?.products.product);
  const productsCategory = useSelector(
    (state: RootState) => state?.products.AllProducts
  );

  const formatTime = (time: string) => {
    return time?.substring(0, 12);
  };

  useEffect(() => {
    (async () => {
      let data = await productsByCategory(product.category, user.accessToken);
      dispatch({
        type: PRODUCTS_BY_CATEGORY,
        payload: data,
      });
    })();
  }, []);

  return (
    <div className="flex pt-10 justify-between mx-auto bg-white h-screen">
      <div className="w-2/5">
        <img src={product.image} alt={product.name} className=" w-full" />
      </div>

      <div className=" ml-8 mt-5 w-2/5 text-left">
        <div className="font-playfair font-bold text-3xl">{product.name}</div>
        <div className="font-serif font-medium text-xl mt-3">
          {product.description}
        </div>
        <div className="font-serif font-medium text-sm text-gray-500 mt-3 border-b-2 border-solid border-slate-500">
          Category:{" "}
          {product.category[0].toUpperCase() +
            product.category.slice(1, -1).toLowerCase()}
        </div>

        <div>
          <p className="text-2xl font-semibold my-5 ">Some reviews...</p>
          {product.review.map((rev) => (
            <article className="border-b-2 border-solid border-slate-500">
              <div className="flex items-center mb-4 space-x-4">
                <img
                  className="w-10 h-10 rounded-full mt-5"
                  src={rev.user.image}
                  alt=""
                />
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    {rev.user.name}{" "}
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(rev?.published?.toString())}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Thinking to buy another one!
                </h3>
              </div>
              <footer className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <p>{rev.valutation}</p>
              </footer>
              <p className="mb-2 text-gray-500 dark:text-gray-400"></p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {rev.comment}
              </p>

              <a
                href="#"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Read more
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="border-solid w-1/5 mt-8">
        Nuovo <br />
        {product.price}
      </div>
    </div>
  );
};
export default Product;

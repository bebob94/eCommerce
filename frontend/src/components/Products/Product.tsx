import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useEffect, useState } from "react";
import {
  PRODUCTS_BY_CATEGORY,
  productsByCategory,
} from "../../Redux/ActionType/products";
import position from "../../icons8-position-50.png";
import {
  ADDRESS,
  ALL_ADDRESSES,
  addressById,
  allAddressesByUser,
} from "../../Redux/ActionType/address";
import { Link } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const User = useSelector((state: RootState) => state?.User.user);
  const user = useSelector((state: RootState) => state?.user.user);
  const allAddresses = useSelector(
    (state: RootState) => state?.address.AllAddressesByUser
  );
  const address = useSelector((state: RootState) => state?.address.address);
  const product = useSelector((state: RootState) => state?.products.product);

  const maxQuantity = product.quantity;
  const quantityOption = [];
  for (let i = 0; i < maxQuantity; i++) {
    quantityOption.push(i + 1);
  }

  const [todayDate, setTodayDate] = useState(new Date());

  const formatTime = (time: string) => {
    return time?.substring(0, 12);
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 10 - filledStars;
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-300 mr-1 star-filled"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={filledStars + i}
          className="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1 star-empty"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };

  useEffect(() => {
    (async () => {
      let data = await allAddressesByUser(user.accessToken, User.id);
      dispatch({
        type: ALL_ADDRESSES,
        payload: data,
      });
    })();
    (async () => {
      let data = await addressById(allAddresses[0]?.id, user.accessToken);
      dispatch({
        type: ADDRESS,
        payload: data,
      });
    })();
    (async () => {
      let data = await productsByCategory(product.category, user.accessToken);
      dispatch({
        type: PRODUCTS_BY_CATEGORY,
        payload: data,
      });
    })();
  }, []);

  useEffect(() => {
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(todayDate.getDate() + 5);
    setTodayDate(fiveDaysLater);
  }, []);

  const formatDateRange = (
    startDate: {
      getDate: () => any;
      toLocaleString: (arg0: string, arg1: { month: string }) => any;
    },
    endDate: { getDate: () => any }
  ) => {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = startDate.toLocaleString("default", { month: "long" });
    return `${startDay} - ${endDay} ${month}`;
  };

  return (
    <div className="flex pt-10 justify-between mx-auto bg-white  h-screen ">
      <div className="w-2/5 h-52 flex justify-center">
        <img src={product.image} alt={product.name} className="  w-96 h-96" />
      </div>

      <div className=" ml-8 mt-5 w-2/5 text-left">
        <div className="font-playfair font-bold text-3xl">{product.name}</div>
        <div className="font-serif font-medium text-xl mt-3">
          {product.description}
        </div>
        <div className="font-serif font-medium text-sm text-gray-500 mt-3 border-b-2 border-solid border-slate-500">
          Category:{" "}
          {product.category[0].toUpperCase() +
            product.category.slice(1).toLowerCase()}
        </div>

        <div>
          <p className="text-2xl font-semibold my-5 ">Some reviews...</p>
          {product.review.map((rev) => (
            <article
              key={rev.id}
              className="border-b-2 border-solid border-slate-500"
            >
              <div className="flex items-center mb-4 space-x-4">
                <img
                  className="w-10 h-10 rounded-full mt-5"
                  src={rev.user.image}
                  alt=""
                />
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    {rev.user.name}{" "}
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(rev?.published?.toString())}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1">
                {renderStars(rev?.valutation)}
              </div>

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

      <div
        className="m-5 pl-5 pt-3 font-serif shadow-sm shadow-slate-500 rounded-md w-1/5 mt-8"
        style={{ border: "1px solid grey" }}
      >
        <span>
          <p> Nuovo</p>
          <p>{product.price}€</p>
        </span>
        <p className="mt-4 text-sm">Consegna senza costi aggiuntivi</p>
        <p className="text-xs mt-2">
          {formatDateRange(
            todayDate,
            new Date(todayDate.getTime() + 4 * 24 * 60 * 60 * 1000)
          )}
        </p>
        <div className="flex mt-5">
          <img src={position} alt="position" className="h-5" />
          <Link to={"/Addresses"}>
            <p className="text-xs mt-1 ml-3 cursor-pointer text-blue-500 hover:text-red-500">
              {" "}
              invia a {`${user.username} - ${address?.city} ${address?.cap} `}
            </p>
          </Link>
        </div>

        <p className="mt-5 mb-2 text-xl text-green-700">
          Disponibilità immediata
        </p>
        <span>
          Quantità:
          <select
            name="quantity"
            autoComplete="off"
            id="quantity"
            tabIndex={0}
            className="border-2 border-solid border-black ml-3 rounded-md"
          >
            {quantityOption.map((quantity) => (
              <option key={quantity} value="quantity">
                {quantity}
              </option>
            ))}
          </select>{" "}
        </span>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="text-white h-10 w-40 bg-orange-500 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm  text-center mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
          >
            Aggiungi al carrello
          </button>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="text-white h-10 w-40 bg-orange-600 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm  text-center mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
          >
            Acquista ora
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;

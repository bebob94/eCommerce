import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART } from "../../Redux/ActionType/products";
import { RootState } from "../../Redux/Store";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart.allProducts);

  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART,
      payload: [],
    });
    console.log("funzioni?");
  };
  return (
    <div className="m-5 h-screen flex justify-between">
      <div className="w-3/4">
        <p className="text-4xl font-medium  w-full ">Carrello</p>
        <p
          className="text-blue-600 text-sm cursor-pointer"
          onClick={(e) => emptyCart}
        >
          Svuota carrello
        </p>
        {cart.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-md my-5 shadow-md  flex"
          >
            <img
              className="rounded-md mr-5"
              src={product.image}
              alt={product.name}
            />
            <div>
              <p className="mt-5  text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </p>
              <p className="mt-5 w-2/3 bg-blue-100 text-blue-800 text-xs font-semibold   py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                {product.description}
              </p>
              <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                {product.price}€
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/5 bg-white mt-16 rounded-md">
        <p className="mt-5 mx-2 font-mono font-bold text-xl">
          Totale provvisorio{" "}
        </p>
      </div>
    </div>
  );
};

export default Cart;

import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART, REMOVE_FROM_CART } from "../../Redux/ActionType/products";
import { RootState } from "../../Redux/Store";
import { products } from "../../Redux/Interfaces";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state?.cart);
  const calculateTotal = () => {
    const total = cart.allProducts.reduce((acc, product, i) => {
      const quantity = cart.quantity[i] || 0;
      return acc + product.price * quantity;
    }, 0);
    const roundedTotal = total.toFixed(2);
    return Number(roundedTotal);
  };

  const deleteProduct = (product: products) => {
    const index = cart.allProducts.indexOf(product);
    if (index !== -1) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { product, quantity: cart.quantity[index] },
      });
    }
  };

  const emptyCart = () => {
    dispatch({ type: EMPTY_CART });
    alert("Carrello svuotato!");
  };

  return (
    <div className="m-5 h-screen flex justify-between">
      {cart.allProducts.length > 0 ? (
        <div className="w-3/4">
          <p className="text-4xl font-medium  w-full ">Carrello</p>
          <p
            className="text-blue-600 text-sm cursor-pointer"
            onClick={(e) => emptyCart()}
          >
            Svuota carrello
          </p>
          {cart.allProducts.map((product, i) => (
            <div
              key={product?.id}
              className="bg-white rounded-md my-5 shadow-md  flex"
            >
              <img
                className="rounded-md mr-5"
                src={product?.image}
                alt={product?.name}
              />
              <div>
                <p className="mt-5  text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product?.name}
                </p>
                <p className="mt-5 w-2/3 bg-blue-100 text-blue-800 text-xs font-semibold   py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                  {product?.description}
                </p>

                <div key={i} className="flex justify-between">
                  <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                    {product?.price}€
                  </p>
                  <p className="mt-5 mr-5 text-xl font-bold text-gray-900 dark:text-white ">
                    Quantità: {cart.quantity[i]}
                  </p>
                </div>
                <div>
                  <p
                    className=" my-3 cursor-pointer text-blue-600"
                    onClick={(e) => deleteProduct(product)}
                  >
                    Rimuovi
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-4xl font-medium  w-full ">Carrello vuoto</p>
      )}
      <div className="w-1/5 bg-white mt-16 rounded-md h-40">
        <p className="mt-5 mx-2 font-mono font-semibold text-md">
          Totale provvisorio ({cart.allProducts.length} articoli):
        </p>
        <p className="mt-5 mx-2 font-mono font-bold text-lg">
          {calculateTotal()}€
        </p>
      </div>
    </div>
  );
};

export default Cart;

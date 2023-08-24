import { useDispatch, useSelector } from "react-redux";
import {
  EMPTY_CART,
  PRODUCT_BY_ID,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  productById,
} from "../../Redux/ActionType/products";
import { RootState } from "../../Redux/Store";
import { products } from "../../Redux/Interfaces";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const User = useSelector((state: RootState) => state?.user.user);
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

  const handleClick = async (id: Number) => {
    let data = await productById(id, User.accessToken);
    dispatch({
      type: PRODUCT_BY_ID,
      payload: data,
    });
  };

  const emptyCart = () => {
    dispatch({ type: EMPTY_CART });
    alert("Carrello svuotato!");
  };

  return (
    <div className="m-5 h-full md:flex justify-between">
      {cart.allProducts.length > 0 ? (
        <div className="md:w-3/4">
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
              className="bg-white rounded-md my-3 shadow-md  flex"
            >
              <Link
                to={`/product/${product.id}`}
                onClick={() => handleClick(product?.id)}
              >
                <img
                  className="rounded-md mr-5 mt-3"
                  src={product?.image}
                  alt={product?.name}
                />
              </Link>
              <div className="ml-3">
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => handleClick(product?.id)}
                >
                  {" "}
                  <p className="mt-3  text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product?.name}
                  </p>
                </Link>
                <p className="mt-5 w-2/3 bg-blue-100 text-blue-800 text-xs font-semibold   py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                  {product?.description}
                </p>

                <div key={i} className="flex justify-between">
                  <p className="mt-5  text-3xl font-bold text-gray-900 dark:text-white">
                    {product?.price}€
                  </p>
                  <span className="mt-5 px-3 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <p className="mt-2 mr-3">Quantità:</p>
                    <input
                      type="number"
                      className="border-2  w-12 text-center border-solid border-black  rounded-md"
                      value={cart.quantity[i]}
                      onChange={(e) =>
                        dispatch({
                          type: UPDATE_QUANTITY,
                          payload: {
                            product,
                            quantity: parseInt(e.target.value), // Assicurati di convertire in un numero
                          },
                        })
                      }
                      min={1} // Imposta il minimo a 1 o un valore appropriato
                      max={product.quantity} // Imposta il massimo alla quantità massima del prodotto
                    />
                  </span>
                </div>
                <div>
                  <p
                    className=" mb-3 cursor-pointer text-blue-600"
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
      <div className="md:w-1/5 bg-white md:mt-16 rounded-md  md:h-52">
        <p className="mt-5 mx-2 font-mono font-semibold text-md">
          Totale provvisorio ({cart.allProducts.length} articoli):
        </p>
        <p className="mt-5 mx-2 font-mono font-bold text-lg">
          {calculateTotal()}€
        </p>
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

export default Cart;

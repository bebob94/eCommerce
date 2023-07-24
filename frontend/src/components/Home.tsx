import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useEffect } from "react";
import {
  ALL_PRODUCTS,
  PRODUCT_BY_ID,
  allProducts,
  productById,
} from "../Redux/ActionType/products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state?.user?.user);
  const products = useSelector(
    (state: RootState) => state?.products?.AllProducts
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e: any) => {
    e.preventDefault();
    let data = await allProducts(user.accessToken);
    dispatch({
      type: ALL_PRODUCTS,
      payload: data,
    });
    navigate("/products");
  };

  const handleClickSingleProduct = async (id: Number) => {
    let data = await productById(id, user.accessToken);
    dispatch({
      type: PRODUCT_BY_ID,
      payload: data,
    });
    navigate(`/product/${id}`);
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
    <div className="h-full">
      <div className=" h-60  py-5 text-center">
        <h2 className="text-6xl font-bold mb-3">Scopri tutte le offerte</h2>
        <h4 className="text-4xl font-semibold mb-5">sui migliori prodotti</h4>
        <h3
          className="text-4xl font-bold text-green-900 font-serif  underline "
          onClick={handleClick}
          style={{
            cursor: `pointer`,
          }}
        >
          LASCIATI ISPIRARE
        </h3>
      </div>
      <p className="text-2xl font-semibold mt-5 mx-5">Some categories...</p>
      {user.username && (
        <div className="flex justify-between mx-5 ">
          <div className="w-1/3 mt-5 p-3 mb-5  flex flex-wrap justify-between bg-white shadow-md shadow-black rounded-md">
            <p className="text-xl font-medium w-full mb-3">Eletronics:</p>
            {products
              .filter((product) => product?.category === "ELECTRONICS")
              .slice(0, 4)
              .map((product, i) => (
                <div
                  key={i}
                  className="w-1/3 m-3"
                  onClick={() => handleClickSingleProduct(product?.id)}
                  style={{
                    cursor: `pointer`,
                  }}
                >
                  <img
                    className="h-24 shadow-md shadow-black rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="mt-2 font-playfair font-bold text-lg">
                    {product.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="w-1/3 mt-5 p-3 mb-5 mx-3 flex flex-wrap justify-between  bg-white shadow-md shadow-black rounded-md">
            <p className="text-xl font-medium w-full mb-3">Sport:</p>
            {products
              .filter((product) => product.category === "SPORT")
              .slice(0, 4)
              .map((product, i) => (
                <div
                  key={i}
                  className="w-1/3 m-3"
                  onClick={() => handleClickSingleProduct(product?.id)}
                  style={{
                    cursor: `pointer`,
                  }}
                >
                  <img
                    className="h-24 shadow-md shadow-black rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="mt-2 font-playfair font-bold text-lg">
                    {product.name}
                  </p>
                </div>
              ))}
          </div>
          <div className="w-1/3 mt-5 p-3 mb-5  flex flex-wrap justify-between  bg-white shadow-md shadow-black rounded-md">
            <p className="text-xl font-medium w-full mb-3">Books:</p>
            {products
              .filter((product) => product.category === "BOOKS")
              .slice(0, 4)
              .map((product, i) => (
                <div
                  key={i}
                  className="w-1/3 m-3"
                  onClick={() => handleClickSingleProduct(product?.id)}
                  style={{
                    cursor: `pointer`,
                  }}
                >
                  <img
                    className="h-24 shadow-md shadow-black rounded-md "
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="mt-2 font-playfair font-bold text-lg">
                    {product.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useEffect } from "react";
import {
  PRODUCTS_BY_CATEGORY,
  productsByCategory,
} from "../Redux/ActionType/products";

const Product = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user.user);
  const product = useSelector((state: RootState) => state?.products.product);
  const productsCategory = useSelector(
    (state: RootState) => state?.products.AllProducts
  );

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
        <img src={product.image} alt={product.name} />
      </div>

      <div className=" ml-8 font-serif font-bold text-2xl w-2/5 text-left">
        {product.name}
      </div>

      <div className="border-solid w-1/5">
        Nuovo <br />
        {product.price}
      </div>
    </div>
  );
};
export default Product;

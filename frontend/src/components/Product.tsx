import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state?.products.product);
  return (
    <div className="flex items-center justify-between mx-auto bg-white h-screen">
      <div className="w-1/3">
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <div className="font-serif font-bold text-2xl w-1/3">
          {product.name}
        </div>
      </div>
      <div className="border-solid w-1/3">
        Nuovo <br />
        {product.price}
      </div>
    </div>
  );
};
export default Product;

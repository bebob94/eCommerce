import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state?.products.product);
  return <div>hello</div>;
};
export default Product;

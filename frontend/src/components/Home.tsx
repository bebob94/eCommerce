import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useEffect } from "react";
import { ALL_PRODUCTS, allProducts } from "../Redux/ActionType/products";
import img1 from "../Immagine.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state?.user.user);
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
    <div>
      <img
        src={img1}
        alt=""
        className="w-full custom-cursor"
        onClick={handleClick}
        style={{
          cursor: `pointer`,
        }}
      />
    </div>
  );
};

export default Home;

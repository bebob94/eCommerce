import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { useEffect } from "react";
import {
  ALL_ADDRESSES,
  allAddressesByUser,
} from "../../Redux/ActionType/address";

const Addresses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user.user);
  const User = useSelector((state: RootState) => state?.User.user);
  const Addresses = useSelector(
    (state: RootState) => state?.address.AllAddressesByUser
  );

  useEffect(() => {
    (async () => {
      let data = await allAddressesByUser(user.accessToken, User.id);
      dispatch({
        type: ALL_ADDRESSES,
        payload: data,
      });
    })();
  }, []);

  return (
    <div className="mt-10 mx-40">
      <p className="text-4xl font-medium w-full mb-8"> I miei Indirizzi</p>

      <div className="flex justify-between text-gray-400">
        <Link to={"/newAddress"} className="cursor-pointer">
          <div className="border-2 h-64 w-64 border-gray-400 border-dashed text-center">
            <p className="text-9xl mt-5">+</p>
            <p className="text-2xl ">Aggiungi indirizzo</p>
          </div>
        </Link>
        {Addresses?.map((address) => (
          <div className="border-2 h-64 w-64 border-gray-400 border-solid  text-black">
            <p className="text-2xl mt-5 ml-5 text-center font-semibold">
              {User?.name}
            </p>
            <p className="text-sm mt-3 ml-5 font-semibold">
              Stato: {address.state}
            </p>
            <p className="text-sm mt-5 ml-5 font-semibold">
              Città: {address.city} {address.cap}
            </p>
            <p className="text-sm mt-5 ml-5 font-semibold">
              Regione: {address.region}
            </p>
            <p className="text-sm mt-5 ml-5 font-semibold">
              Indirizzo: {address.street} {address.houseNumber}
            </p>
            <div className="felx justify-between mt-3 ml-5">
              <button className="text-blue-700 mr-3">Modifica</button>|
              <button className="text-blue-700 ml-3"> Rimuovi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
function dispatch(arg0: { type: any; payload: any }) {
  throw new Error("Function not implemented.");
}

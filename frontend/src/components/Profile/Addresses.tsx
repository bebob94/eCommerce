import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { useEffect } from "react";
import {
  ADDRESS,
  ALL_ADDRESSES,
  addressById,
  allAddressesByUser,
  deleteAddress,
} from "../../Redux/ActionType/address";
import ChangeAddressModal from "../Modals/ChangeAddressModal";

const Addresses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user.user);
  const User = useSelector((state: RootState) => state?.User.user);
  const Addresses = useSelector(
    (state: RootState) => state?.address.AllAddressesByUser
  );
  const singleAddress = useSelector(
    (state: RootState) => state?.address.address
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Vuoi eliminare questo indirizzo?");
    if (confirmDelete) {
      try {
        await deleteAddress(id, user.accessToken);
        let data = await allAddressesByUser(user.accessToken, User.id);
        dispatch({
          type: ALL_ADDRESSES,
          payload: data,
        });
      } catch (error) {
        console.log(`Errore durante l'eliminazione dell'indirizzo ${error}`);
      }
    }
  };

  const handleChange = async (id: number) => {
    try {
      let data = await addressById(id, user.accessToken);
      console.log(data);

      dispatch({
        type: ADDRESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Addresses) {
        let data = await addressById(Addresses[0].id, user.accessToken);
        console.log(data);

        dispatch({
          type: ADDRESS,
          payload: data,
        });
      }
    })();
    (async () => {
      let data = await allAddressesByUser(user.accessToken, User.id);
      dispatch({
        type: ALL_ADDRESSES,
        payload: data,
      });
    })();
  }, []);

  return (
    <div className="mt-10 ss:mx-40 ">
      <p className="text-4xl font-medium  w-full mb-8"> I miei Indirizzi</p>

      <div className="ss:grid ss:grid-cols-3 ss:gap-4 text-gray-400 ">
        <Link to={"/newAddress"} className="cursor-pointer">
          <div className="border-2 h-80  border-gray-400 border-dashed text-center mb-10 ss:mb-0">
            <p className="text-9xl mt-16">+</p>
            <p className="text-2xl ">Aggiungi indirizzo</p>
          </div>
        </Link>
        {Addresses?.map((address) => (
          <div
            key={address.id}
            className="border-2 h-80 w-full  border-gray-400 border-solid  text-black mb-10 ss:mb-0"
          >
            {address.id === singleAddress.id ? (
              <div className="flex mx-2 py-3 border-b-2 border-solid border-gray-400">
                <span className="text-xs font-semibold ">Predefinita:</span>
                <Link className="flex items-center ml-3" to={"/"}>
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-4 mr-1"
                    alt="Flowbite Logo"
                  />
                  <span className="hidden ss:block self-center text-xs font-semibold whitespace-nowrap dark:text-white">
                    Bebozon
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex mx-2 py-3 border-b-2 border-solid border-gray-400">
                <button
                  className="text-blue-700 "
                  onClick={() => handleChange(address.id)}
                >
                  {" "}
                  Imposta come predefinito
                </button>
              </div>
            )}
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
              Provincia: {address.region}
            </p>
            <p className="text-sm mt-5 ml-5 font-semibold">
              Indirizzo: {address.street} {address.houseNumber}
            </p>
            <div className="flex justify-evenly mt-3 ">
              <ChangeAddressModal addressId={address.id} />
              <button
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleDelete(address.id)}
              >
                {" "}
                Rimuovi
              </button>{" "}
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

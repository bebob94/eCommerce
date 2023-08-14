import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import {
  USER_BY_USERNAME,
  changeMyProfileInfo,
  userByUsername,
} from "../../Redux/ActionType/User";
import { address } from "../../Redux/Interfaces";
import Select, { ActionMeta } from "react-select";
import countryList from "react-select-country-list";
import {
  ADDRESS,
  ALL_ADDRESSES,
  addressById,
  allAddressesByUser,
  changeMyAddressInfo,
} from "../../Redux/ActionType/address";
import useMediaQuery from "../../hooks/useMediaQuery";

const ChangeAddressModal = ({ addressId }: { addressId: number }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [state, setState] = useState<string>("Seleziona uno stato");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number>(0);
  const [cap, setCap] = useState<string>("");
  const user = useSelector((state: RootState) => state?.User.user);
  const User = useSelector((state: RootState) => state?.user.user);
  const Address = useSelector((state: RootState) => state?.address.address);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    const payload: address = {
      id: addressId,
      state,
      city,
      street,
      region,
      houseNumber,
      cap,
    };
    try {
      const response = await changeMyAddressInfo(payload, User.accessToken);
      (async () => {
        let data = await addressById(addressId, User.accessToken);
        dispatch({
          type: ADDRESS,
          payload: data,
        });
        let data2 = await allAddressesByUser(User.accessToken, User.id);
        dispatch({
          type: ALL_ADDRESSES,
          payload: data2,
        });
      })();

      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const countryOptions = useMemo(() => {
    const countries = countryList().getData();
    return countries.map((country) => ({
      label: country.label,
      value: country.value,
    }));
  }, []);

  const changeHandler = (selectedOption: any, actionMeta: ActionMeta<any>) => {
    setState((selectedOption as { label: string; value: string }).value);
  };

  const isAboveLarge = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <button
        data-modal-target="ChangeName-modal"
        data-modal-toggle="ChangeName-modal"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleShow}
      >
        Modifica
      </button>
      <div
        style={{ display: show ? "block" : "none" }}
        id="ChangeName-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="ChangeName-modal"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Modifica il tuo indirizzo
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <p className="mb-1 font-semibold">Stato</p>
                  <Select
                    options={countryOptions}
                    value={
                      state !== null
                        ? { label: state, value: state }
                        : { label: "Seleziona uno stato", value: "" }
                    }
                    onChange={changeHandler}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1 font-semibold">Città</p>
                  <input
                    type="text"
                    id="city"
                    autoComplete="off"
                    placeholder="città"
                    required
                    value={city}
                    className=" w-full"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1 font-semibold">Indirizzo</p>
                  <input
                    type="text"
                    id="street"
                    autoComplete="off"
                    placeholder="indirizzo completo"
                    required
                    value={street}
                    className=" w-full"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1 font-semibold">Provincia</p>
                  <input
                    type="text"
                    id="region"
                    autoComplete="off"
                    placeholder="Provincia"
                    required
                    value={region}
                    className=" w-full"
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>
                <div className="mt-3 flex justify-between">
                  <span>
                    <p className="mb-1 font-semibold">Numero civico</p>
                    <input
                      type="number"
                      id="houseNumber"
                      autoComplete="off"
                      placeholder="Numero civico"
                      required
                      value={houseNumber}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value); // Converti in numero
                        if (!isNaN(value)) {
                          // Verifica se è un numero valido
                          setHouseNumber(value);
                        }
                      }}
                    />
                  </span>{" "}
                  <span>
                    <p className="mb-1 font-semibold">Cap</p>
                    <input
                      className="w-11/12 ss:w-full"
                      type="text"
                      id="cap"
                      autoComplete="off"
                      placeholder="Cap"
                      required
                      value={cap}
                      onChange={(e) => setCap(e.target.value)}
                    />
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Salva Modifiche
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default ChangeAddressModal;

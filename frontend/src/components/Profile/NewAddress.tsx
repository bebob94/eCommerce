import React, { useState, useMemo, useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import countryList from "react-select-country-list";
import { newAddress } from "../../Redux/Interfaces";
import { postAddress } from "../../Redux/ActionType/address";
import { RootState } from "../../Redux/Store";
import { useSelector } from "react-redux";

const NewAddress = () => {
  const User = useSelector((state: RootState) => state?.User.user);
  const user = useSelector((state: RootState) => state?.user.user);
  const [state, setState] = useState<string>("Seleziona uno stato");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<number>(0);
  const [cap, setCap] = useState<string>("");

  const handleSubmit = async () => {
    const addressPayload: newAddress = {
      state,
      city,
      street,
      region,
      houseNumber,
      cap,
    };
    console.log(addressPayload);
    try {
      const response = await postAddress(
        user.accessToken,
        addressPayload,
        User.id
      );
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

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="mt-10 mx-auto w-1/3">
      <p className="text-3xl text-center font-medium w-full mb-8">
        Aggiungi un nuovo indirizzo
      </p>
      <form>
        <div>
          <p className="mb-2 font-semibold">Stato</p>
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
        <div className="mt-5">
          <p className="mb-2 font-semibold">Città</p>
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
        <div className="mt-5">
          <p className="mb-2 font-semibold">Indirizzo</p>
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
        <div className="mt-5">
          <p className="mb-2 font-semibold">Regione</p>
          <input
            type="text"
            id="region"
            autoComplete="off"
            placeholder="Regione"
            required
            value={region}
            className=" w-full"
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="mt-5 flex justify-between">
          <span>
            <p className="mb-2 font-semibold">Numero civico</p>
            <input
              type="number"
              id="houseNumber"
              autoComplete="off"
              placeholder="Numero civico"
              required
              value={houseNumber}
              onChange={(e) => setHouseNumber(parseInt(e.target.value))}
            />
          </span>{" "}
          <span>
            <p className="mb-2 font-semibold">Cap</p>
            <input
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
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Aggiungi indirizzo
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAddress;

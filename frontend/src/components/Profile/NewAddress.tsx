import React, { useState, useMemo } from "react";
import Select, { ActionMeta } from "react-select";
import countryList from "react-select-country-list";

const NewAddress = () => {
  const [value, setValue] = useState<string | null>(null);

  const countryOptions = useMemo(() => {
    const countries = countryList().getData();
    return countries.map((country) => ({
      label: country.label,
      value: country.value,
    }));
  }, []);

  const changeHandler = (
    selectedOption: any, // TypeScript inferirà il tipo per 'selectedOption'
    actionMeta: ActionMeta<any> // TypeScript inferirà il tipo per 'actionMeta'
  ) => {
    if (selectedOption) {
      setValue((selectedOption as { label: string; value: string }).value);
    } else {
      setValue(null);
    }
  };

  return (
    <div className="mt-10 mx-auto w-1/3">
      <p className="text-3xl text-center font-medium w-full mb-8">
        Aggiungi un nuovo indirizzo
      </p>
      <form action="">
        <div>
          <p className="mb-2 font-semibold">Stato</p>
          <Select
            options={countryOptions}
            value={
              value !== null
                ? { label: value, value: value }
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
            className=" w-full"
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
            className=" w-full"
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
            className=" w-full"
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
            />
          </span>
        </div>
      </form>
    </div>
  );
};

export default NewAddress;

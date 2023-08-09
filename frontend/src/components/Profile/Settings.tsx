import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const Settings = () => {
  const User = useSelector((state: RootState) => state?.User.user);
  const myAddress = useSelector((state: RootState) => state?.address.address);

  return (
    <div className="m-10  h-full ">
      <p className="text-4xl text-center font-medium  ">Utente</p>
      <div className="w-1/2 bg-white rounded-md my-5 mx-auto shadow-md p-3">
        <div className="my-6 flex justify-between items-center">
          <div>
            <p>Nome:</p>
            <p>{User.name}</p>
          </div>
          <div>
            <button className="mt-3 rounded-md shadow-2xl py-2 px-5 mr-3 border-black border-solid border-2">
              modifica
            </button>
          </div>
        </div>{" "}
        <hr />
        <div className="my-6 flex justify-between">
          <div>
            <p>Email:</p>
            <p>{User.email}</p>
          </div>
          <div>
            <button className="mt-3 rounded-md shadow-lg  py-2 px-5 mr-3 border-black border-solid border-2">
              modifica
            </button>
          </div>
        </div>{" "}
        <hr />
        <div className="my-6 flex justify-between">
          <div>
            <p>Indirizzo:</p>
            <p>{myAddress.street + myAddress.houseNumber}</p>
          </div>
          <div>
            <button className="mt-3 rounded-md shadow-lg  py-2 px-5 mr-3 border-black border-solid border-2">
              modifica
            </button>
          </div>
        </div>{" "}
        <hr />
        <div className="my-6 flex justify-between">
          <div>
            <p>Immagine:</p>
            <img
              className="w-10 h-10 ml-5 mt-2 rounded-full"
              src={User?.image}
              alt="user photo"
            />
          </div>
          <div>
            <button className="mt-3 rounded-md shadow-lg  py-2 px-5 mr-3 border-black border-solid border-2">
              modifica
            </button>
          </div>
        </div>{" "}
        <hr />
      </div>
    </div>
  );
};

export default Settings;

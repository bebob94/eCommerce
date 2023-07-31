import { Link } from "react-router-dom";

const Addresses = () => {
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
      </div>
    </div>
  );
};

export default Addresses;

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mt-10 ss:mx-40 text-center">
      <p className="text-4xl font-medium w-full mb-8"> Il mio account</p>
      <div className="ss:flex ss:justify-between">
        <Link
          to={"/"}
          className="block ss:max-w-xs mb-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 font-opensans text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            I miei ordini
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Traccia, restituisci o acquista nuovamente degli articoli
          </p>
        </Link>
        <Link
          to={"/Addresses"}
          className="block ss:max-w-xs mb-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 font-opensans text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Indirizzi
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Modifica indirizzi e preferenze di consegna per gli ordini e i
            regali
          </p>
        </Link>
        <Link
          to={"/"}
          className="block ss:max-w-xs p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 font-opensans text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            I miei pagamenti
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Visualizza tutte le transazioni, gestisci le impostazioni e i metodi
            di pagamento
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

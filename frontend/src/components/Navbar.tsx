import React, { useEffect, useState } from "react";
import { USER } from "../Redux/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../Redux/Store";
import { motion } from "framer-motion";
import { USER_BY_USERNAME, userByUsername } from "../Redux/ActionType/User";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const User = useSelector((state: RootState) => state?.User.user);
  const user = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USE_NAVIGATE, USE_SELECTORE, USE_STATE, USE_DISPATCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FUNZIONI DEL COMPONENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    (async () => {
      let data = await userByUsername(
        user.user.username,
        user.user.accessToken
      );
      dispatch({
        type: USER_BY_USERNAME,
        payload: data,
      });
    })();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({
      type: USER,
      payload: {},
    });
    navigate("/Login");
  };

  const categories = [
    "ELECTRONICS",
    "CLOTHING",
    "BOOKS",
    "SPORT",
    "TOYS",
    "FOOD",
    "MERCHANDISING",
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="hidden ss:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bebozon
          </span>
        </a>

        <div className="relative  flex w-3/6">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-sm bg-gray-100  focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <svg
            className="absolute w-5 h-5 top-3 right-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l5.5 5.5M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        {user?.user && user?.user.username ? (
          <>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={User?.image}
                alt="user photo"
              />
            </button>

            {isDropdownOpen && (
              <motion.div
                className="z-50 absolute right-0 top-16 xs:w-3/4 sm:w-1/5 mr-5 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {User.name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {User.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </>
        ) : (
          <div>
            <Link to={"/login"} className="me-3">
              <span>
                {" "}
                <strong>Accedi</strong>
              </span>
            </Link>
            <Link to={"/register"}>
              <span>
                {" "}
                <strong>Registrati</strong>
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
function dispatch(arg0: { type: any; payload: {} }) {
  throw new Error("Function not implemented.");
}

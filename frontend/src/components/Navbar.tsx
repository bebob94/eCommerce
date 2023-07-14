import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Bebozon
          </span>
        </a>
        <div className="relative flex w-4/6">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm bg-gray-200 rounded-l-md focus:outline-none"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            Categories
            <svg
              className={`ml-2 h-5 w-5 transform ${
                isCategoryOpen ? "-rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isCategoryOpen && (
            <div className=" absolute top-8 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`${
                      selectedCategory === category
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-sm bg-gray-100 rounded-e-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <svg
            className="absolute w-5 h-5 top-2 right-3 text-gray-500"
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
            src="/docs/images/people/profile-picture-3.jpg"
            alt="user photo"
          />
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="z-50 absolute right-0 xs:w-3/4 sm:w-1/5 mr-5 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
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
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router"; // fixed import
import { AuthContext } from "../Contex/AuthProvider";
import Loader from "./Loader";


const Navber1 = () => {

  const { user, LogOut, loading, theme, toggleTheme } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);





  if (loading) return <Loader />;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
      </li>
      <li>
        <NavLink to="/allplants" onClick={() => setMenuOpen(false)}>All Plants</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addplant" onClick={() => setMenuOpen(false)}>Add Plant</NavLink>
          </li>
          <li>
            <NavLink to="/myplants" onClick={() => setMenuOpen(false)}>My Plants</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          </li>
        </>
      )}


    </>
  );

  const dropDownClassDesktop = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const logoClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <nav className={`border-b ${dropDownClassDesktop} sticky top-0 z-10`}>
      <div className="container flex flex-wrap items-center justify-between mx-auto px-4 md:px-0 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" className="w-12  rounded-full mr-1" alt="Logo" />
          <span className="text-2xl md:text-3xl font-bold text-[#1A9120] poetsen-one ml-0 ">
            Flora<span className={`${logoClass}`}>Track</span>
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`w-full lg:w-auto lg:flex ${menuOpen ? "block" : "hidden"}`}>
          <ul className={` text-xl poppins flex flex-col lg:flex-row lg:gap-5 space-y-3 lg:space-y-0 items-center  py-4 lg:mt-0  text-lg ${dropDownClassDesktop} lg:p-0 rounded-lg lg:rounded-none `}>
            {navLinks}

            <li className="mt-2 lg:mt-0 flex items-center">
              {/* {user && (
              <div>
                <div
                  className=" tooltip tooltip-bottom tooltip-primary " data-tip={user?.displayName} 
                  
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co.com/MyLkVgN0/Screenshot-2025-05-06-001159.png"
                    }
                    className="w-12 mt-2  rounded-full hidden lg:block"
                    alt="User Avatar"
                  />
                </div>
              </div>
            )} */}

              {!user && (
                <div className="flex flex-col lg:flex-row ">
                  <Link
                    to="/signin"
                    className="block px-4 py-2 bg-[#1A9120] text-white rounded hover:bg-green-700 transition-all"
                  >
                    Log in
                  </Link>
                  {/* <Link
                    to="/signup"
                    className="block px-4 py-2 bg-[#1A9120] text-white rounded hover:bg-green-700 transition-all"
                  >
                    Sign Up
                  </Link> */}
                </div>
              )}
            </li>

            <li>

              <input
                type="checkbox"
                className="toggle "
                onChange={toggleTheme}
                checked={theme === "dark"}
              />

            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber1;

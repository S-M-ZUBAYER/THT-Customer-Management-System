import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {MdArrowDropDown } from "react-icons/md";
import {RiMenu3Line } from "react-icons/ri";
import GrozzieeLogo from "../../../Assets/Images/Grozziie/Grozziie_logo.jpg"
import UserContext, { AuthContext } from '../../../context/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const {user}=useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const customerToggleMenu = () => setIsCustomerOpen(!isCustomerOpen);
  const adminToggleMenu = () => setIsAdminOpen(!isAdminOpen);

  return (
    <header aria-label="Site Header" className="bg-white ">
      <div className="mx-auto px-6 md:px-0">
        <div className="flex h-16 items-center justify-between">

        <div className="relative visible lg:hidden">
              <button

                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600"

                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={adminToggleMenu}
              >
                <RiMenu3Line></RiMenu3Line>
              </button>
              {isAdminOpen && (
                <div className="origin-top-right absolute z-40 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="col-span-1 shadow-lg rounded-lg">
                    <ul data-aos="fade-up-right" data-aos-duration="2000" className="menu w-full text-start">

                        {/* {
    user.isAdmin==="true" && <> */}
                        <li><Link to='/admin/users' className="sm:text-xs md:text-base text-gray-700">All Users</Link></li>
                        <li><Link to='/admin/questionAnswer' className="sm:text-xs md:text-base text-gray-700">Add Q & A</Link></li>
                        <li><Link to='/admin/icon' className="sm:text-xs md:text-base text-gray-700">Add Icons</Link></li>
                        <li><Link to='/admin/mallProduct' className="sm:text-xs md:text-base text-gray-700">Add Mall Products</Link></li>
                        <li><Link to='/admin/eventProduct' className="sm:text-xs md:text-base text-gray-700">Add Event Products</Link></li>
                        {/* </>
} */}

                        <Link className="text-left ml-2" to='/'>
                            <button className='px-4 py-2 mt-8 ml-0 font-semibold bg-[#004368] text-white lg:text-lg rounded  mb-5'>
                                Back to homepage
                            </button>
                        </Link>
                    </ul>
                </div>
                </div>
              )}
            </div>


          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-600" to="/home">
              <span className="sr-only">Home</span>
              {/* <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg> */}
              <img className="w-32 h-8" src={GrozzieeLogo}></img>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-base ">
                <li>
                  <Link
                    className="text-gray-500 transition hover:font-semibold hover:text-zinc-900"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <div className="relative">
                    <button
                      className="flex justify-between items-center  text-gray-500 transition hover:font-semibold hover:text-zinc-900"
                      onClick={toggleMenu}
                    >
                      Customer Service  
                      <MdArrowDropDown className="text-2xl pt-1"></MdArrowDropDown>

                    </button>
                    {isOpen && (
                      <div className="absolute left-0 z-40 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <Link
                            to="/customer-1"
                            onClick={toggleMenu}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:font-semibold hover:text-zinc-900"
                            role="menuitem"
                          >
                            Automatic Service
                          </Link>
                          <Link
                            to="/customer-2"
                            onClick={toggleMenu}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold hover:text-zinc-900"
                            role="menuitem"
                          >
                            Manual Service
                          </Link>

                        </div>
                      </div>
                    )}
                  </div>

                </li>

                {/* {
                  user.isAdmin==="true" &&  */}
                  <li>
                  <Link
                    className="text-gray-500 transition hover:font-semibold hover:text-zinc-900"
                    to="/admin/dashboard"
                  >
                    Admin
                  </Link>
                </li>
                {/*  } */}

                <li>
                  <Link
                    className="text-gray-500 transition hover:font-semibold hover:text-zinc-900"
                    to="/account"
                  >
                    Account
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:font-semibold hover:text-zinc-900"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-md bg-[#004368] px-5 py-2 text-sm font-semibold text-white shadow dark:hover:bg-teal-500"
                to="/login"
              >
                Sign In
              </Link>

          
            </div>


            <div className="relative sm:visible lg:hidden">
              <button

                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"

                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={toggleMenu}
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/home"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:font-semibold hover:text-zinc-900"
                      role="menuitem"
                    >
                      Home
                    </Link>
                    <div className="relative px-4">
                    <button
                      className="mx-auto flex justify-between items-center  text-gray-500 transition hover:text-gray-500/75  hover:font-semibold hover:text-zinc-900"
                      onClick={customerToggleMenu}
                    >
                      Customer Service  
                      <MdArrowDropDown className="text-2xl pt-1"></MdArrowDropDown>

                    </button>
                    {isCustomerOpen && (
                      <div className="absolute left-[-180px] top-3 z-40 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hover:font-semibold hover:text-zinc-900">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <Link
                            to="/customer-1"
                            onClick={customerToggleMenu}
                            className="block py-2 text-sm text-gray-700 hover:bg-gray-100 ring-black ring-opacity-5  hover:font-semibold hover:text-zinc-900 "
                            role="menuitem"
                          >
                            Customer Service 1
                          </Link>
                          <Link
                            to="/customer-2"
                            onClick={customerToggleMenu}
                            className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-semibold hover:text-zinc-900"
                            role="menuitem"
                          >
                            Customer Service 2
                          </Link>

                        </div>
                      </div>
                    )}
                  </div>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Admin
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Account
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Contact
                    </Link>

                  </div>
                </div>
              )}
            </div>







          </div>
        </div>
      </div>
    </header>

  );
};

export default Navbar;
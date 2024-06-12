import React from "react";
import { menuItems } from "./HeaderConfig";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../heading/Heading";

const Header = () => {
  const { toggleCart } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  function openCartPage() {
    navigate('/CartPage');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    console.log(`Searching for: ${query}`);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    navigate('/Home');
  };

  return (
    <header className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg className="h-8 w-8 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              className="text-white"
              fill="#fff"
              fillRule="evenodd"
              d="M10 0a2 2 0 0 1 2 2v5a2 2 0 0 1-1 1.732V18a2 2 0 0 1-2 2s-1.04-.358-1.973-1H5.973C5.04 19.642 4 20 4 20a2 2 0 0 1-2-2V8.732A2 2 0 0 1 1 7V2a2 2 0 0 1 2-2h7zm3 2H7 a1 1 0 1 0 0 2 h6 a1 1 0 1 0 0-2 zm0 4 H7 a1 1 0 1 0 0 2 h6 a1 1 0 1 0 0-2 zM7 16 h6 a1 1 0 1 0 0-2 H7 a1 1 0 1 0 0 2 z"
            />
          </svg>
          <Link to={'/Home'} className="text-white text-lg font-semibold">Fashion Shop</Link>
        </div>
        <form className="flex items-center mx-4 mb-4 sm:mb-0" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            className="bg-gray-200 text-black rounded-l-md px-4 py-2 border border-gray-500 focus:outline-none focus:border-white w-64"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-gray-500 text-white rounded-r-md px-4 py-2 border border-gray-500 border-l-0 hover:bg-gray-800 focus:outline-none flex items-center justify-center"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
        <div className="flex items-center relative mb-4 sm:mb-0">
          {user ? (
            <div className="relative group mx-5">
              <span className="text-white text-lg mr-2">Hi, {user.firstName}</span>
              <div className="flex items-center cursor-pointer group-hover:block">
                <Link to="/Home" className="flex items-center">
                  <Heading customClasses="text-white">My Account</Heading>
                  <svg className="ml-1 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>           
                <div className="absolute py-1 w-48 bg-white shadow-xl z-20 hidden group-hover:block">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/LoginPage" className="bg-transparent text-white text-lg mr-4">Login</Link>
              <Link to="/SignUpPage" className="bg-transparent text-white text-lg mr-4">Register</Link>
            </>
          )}
          <button className="bg-transparent text-white text-lg" onClick={openCartPage}>
            <svg className="h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9 18a2 2 0 0 0 4 0h5V5a2 2 0 0 0-2-2H6.618l-.351-1.054A1 1 0 0 0 5.294 1H1v2h3.412l3.764 11.292A2 2 0 0 0 9 18zm3-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6-6V7a1 1 0 1 1 2 0v1h9V7a1 1 0 1 1 2 0v1h2a1 1 0 0 0 0-2H4z"/>
            </svg>
          </button>
        </div>
      </div>
      <nav className="flex items-center bg-gray-500 justify-center py-4 px-6">
        <ul className="flex flex-wrap justify-center">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="mx-4 relative">
              {menuItem.subcategories ? (
                <div className="group relative">
                  <Link to={menuItem.link} className="text-white py-1 hover:underline text-lg cursor-pointer">{menuItem.label}</Link>
                  <ul className="absolute hidden group-hover:block bg-gray-600 py-1 rounded-md border border-white z-20">
                    {menuItem.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <button className="text-white px-4 py-2 block hover:underline">{subcategory}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link to={menuItem.link} className="text-white hover:underline text-lg cursor-pointer">{menuItem.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

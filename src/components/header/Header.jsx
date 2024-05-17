import React from "react";
import { menuItems } from "./HeaderConfig";
import { useCart } from "../../contexts/CartContext"; 
 
// Header component definition
const Header = () => {
  const { toggleCart } = useCart();
  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value; // Getting the search query from the form input
    // Handle search logic here
    console.log(`Searching for: ${query}`); // Logging the search query to the console
  };
 
  return (
    <header className="bg-gray-700">
      {/* First Row */}
      <div className="flex items-center justify-between bg-gray-600 py-4 px-6">
        <div className="flex items-center">
          {/* Logo SVG */}
          <svg
            className="h-8 w-8 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              className="text-white"
              fill="#fff"
              fillRule="evenodd"
              d="M10 0a2 2 0 0 1 2 2v5a2 2 0 0 1-1 1.732V18a2 2 0 0 1-2 2s-1.04-.358-1.973-1H5.973C5.04 19.642 4 20 4 20a2 2 0 0 1-2-2V8.732A2 2 0 0 1 1 7V2a2 2 0 0 1 2-2h7zm3 2H7 a1 1 0 1 0 0 2 h6 a1 1 0 1 0 0-2 zm0 4 H7 a1 1 0 1 0 0 2 h6 a1 1 0 1 0 0-2 zM7 16 h6 a1 1 0 1 0 0-2 H7 a1 1 0 1 0 0 2 z"
            />
          </svg>
          {/* Website title */}
          <h1 className="text-white text-lg font-semibold">Fashion Shop</h1>
        </div>
        {/* Search form */}
        <form className="flex items-center mx-4" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            className="bg-gray-200 text-black rounded-l-md px-4 py-2 border border-gray-500 focus:outline-none focus:border-white w-64"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-gray-700 text-white rounded-r-md px-4 py-2 border border-gray-500 border-l-0 hover:bg-gray-800 focus:outline-none flex items-center justify-center"
          >
            {/* Search icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
        {/* Login/Register Links and cart icon */}
        <div className="flex items-center">
          <a href="/LoginPage" className="bg-transparent text-white text-lg mr-4">
            Login /
          </a>
          <a href="/SignUpPage" className="bg-transparent text-white text-lg mr-4">
            Register
          </a>
          {/* Cart icon */}
          <button className="bg-transparent text-white mr-4 text-lg" onClick={toggleCart}>
            <svg className="h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9 18a2 2 0 0 0 4 0h5V5a2 2 0 0 0-2-2H6.618l-.351-1.054A1 1 0 0 0 5.294 1H1v2h3.412l3.764 11.292A2 2 0 0 0 9 18zm3-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6-6V7a1 1 0 1 1 2 0v1h9V7a1 1 0 1 1 2 0v1h2a1 1 0 0 0 0-2H4z"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Second Row */}
      <nav className="flex items-center justify-center py-4 px-6">
        <ul className="flex">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="mx-4 relative">
              {menuItem.subcategories ? (
                <div className="group relative">
                  <a
                    href={menuItem.link}
                    className="text-white py-1 hover:underline text-lg"
                    style={{ cursor: "pointer" }}
                  >
                    {menuItem.label}
                  </a>
                  {/* Dropdown menu for subcategories */}
                  <ul className="absolute hidden group-hover:block bg-gray-600 py-1 rounded-md border border-white">
                    {menuItem.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <button
                          className="text-white px-4 py-2 block hover:underline"
                        >
                          {subcategory}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  href={menuItem.link}
                  className="text-white hover:underline text-lg"
                  style={{ cursor: "pointer" }}
                >
                  {menuItem.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
 
export default Header;
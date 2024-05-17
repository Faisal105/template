import React, { useState } from 'react';
import { useCart } from "../../contexts/CartContext"; 

const Header = () => {

  const { toggleCart } = useCart();

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Categories', subcategories: ['Men', 'Women', 'Children'] },
    { label: 'Services', link: '#' },
    { label: 'About', link: '#' }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleLogin = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  return (
    <header className="bg-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <svg className="h-8 w-8 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path className="text-white" fill="#fff" fillRule="evenodd" d="M10 0a2 2 0 0 1 2 2v5a2 2 0 0 1-1 1.732V18a2 2 0 0 1-2 2s-1.04-.358-1.973-1H5.973C5.04 19.642 4 20 4 20a2 2 0 0 1-2-2V8.732A2 2 0 0 1 1 7V2a2 2 0 0 1 2-2h7zm3 2H7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4H7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zM7 16h6a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2z"/>
        </svg>
        <h1 className="text-white text-lg font-semibold">Fashion Shop</h1>
      </div>
      <nav className="flex items-center">
        <ul className="flex">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="mx-4 relative">
              {menuItem.subcategories ? (
                <div className="group relative">
                  <a href={menuItem.link} className="text-white py-1 hover:underline text-lg" style={{ cursor: 'pointer' }}>{menuItem.label}</a>
                  <ul className="absolute hidden group-hover:block bg-gray-600 py-1 rounded-md border border-white">
                    {menuItem.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <button className="text-white px-4 py-2 block hover:underline">{subcategory}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a href={menuItem.link} className="text-white hover:underline text-lg" style={{ cursor: 'pointer' }}>{menuItem.label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center">
        <div className='relative'>
          <button className="bg-transparent text-white mr-4 text-lg" onClick={toggleCart}>
            <svg className="h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9 18a2 2 0 0 0 4 0h5V5a2 2 0 0 0-2-2H6.618l-.351-1.054A1 1 0 0 0 5.294 1H1v2h3.412l3.764 11.292A2 2 0 0 0 9 18zm3-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6-6V7a1 1 0 1 1 2 0v1h9V7a1 1 0 1 1 2 0v1h2a1 1 0 0 0 0-2H4z"/>
            </svg>
          </button>
        </div>
        
        
        <button className="bg-transparent text-white text-lg" onClick={handleToggleLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
}

export default Header;










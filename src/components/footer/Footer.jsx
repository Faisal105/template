import React from 'react';
import { Link } from 'react-router-dom';
import { FooterItems } from './FooterConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-white p-8 mt-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-start justify-between sm:justify-center sm:items-center border-b">
        {FooterItems.map((section, index) => (
          <div key={index} className="w-full sm:w-3/4 md:w-1/4 md:text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            <ul className="list-none">
              {section.links.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center mt-4 py-2">
        <p className="text-sm"> &copy; {currentYear} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

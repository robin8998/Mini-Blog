import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and Copyright Section */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center">
                  <Logo width="120px" />
                </Link>
                <p className="mt-4 text-gray-600 max-w-md">
                  Creating beautiful blog experiences for writers and readers alike. Share your stories with the world.
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-gray-600">
                  &copy; Copyright {currentYear}. All Rights Reserved by DevRobin.
                </p>
              </div>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="lg:col-span-2 md:mt-0 mt-8">
            <h3 className="text-sm font-semibold uppercase text-gray-700 tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-base"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="lg:col-span-2 md:mt-0 mt-8">
            <h3 className="text-sm font-semibold uppercase text-gray-700 tracking-wider mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-base"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div className="lg:col-span-3 md:mt-0 mt-8">
            <h3 className="text-sm font-semibold uppercase text-gray-700 tracking-wider mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-base"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <p className="text-sm text-gray-500">
              Designed and built with all the love in the world.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
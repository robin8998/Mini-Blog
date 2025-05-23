import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("Home");
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      IsCurrent: currentItem
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      IsCurrent: currentItem
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      IsCurrent: currentItem
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      IsCurrent: currentItem
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      IsCurrent: currentItem
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentSection = (item) => {
    navigate(item.slug);
    setCurrentItem(item.name);
  }
  
  return (
    <header className='sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-xl'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo Section */}
          <div className='flex items-center transition-transform duration-300 hover:scale-105 '>
            <Link to={"/"}>
              <Logo width='70px' /> 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center'>
            <ul className='flex items-center space-x-3'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => (currentSection(item))}
                      className={`
                        inline-block px-5 py-2 rounded-lg 
                        ${item.IsCurrent === item.name 
                          ? "text-orange-500 font-bold bg-gray-800/40 border-b-2 border-orange-500" 
                          : "text-white font-medium"}
                        transition-all duration-300 
                        hover:bg-gray-800 hover:shadow-md active:scale-95
                      `}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='ml-3'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none transition-colors duration-300'
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="text-orange-400" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden bg-gray-800 rounded-lg shadow-xl mt-2 py-3 px-4 animate-fadeIn'>
            <ul className='flex flex-col space-y-2'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        w-full text-left px-4 py-3 rounded-md
                        ${currentItem === item.name 
                          ? "bg-gray-700 text-orange-500 font-semibold border-l-4 border-orange-500" 
                          : "text-white font-medium"}
                        transition-all duration-300 hover:bg-gray-700 active:scale-95
                      `}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='pt-3 border-t border-gray-700'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
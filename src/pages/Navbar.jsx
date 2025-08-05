import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../src/img/logo.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-44 w-auto" />
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/about" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/services" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Services</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/career" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Career</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/portfolio" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Portfolio</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/blogs" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Blogs</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>

          <Link to="/contact" className="nav-link group relative px-3 py-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#60a5fa]">Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
            
          )}
        </button>
      </div>

      <div className={`container mobile-menu ${isOpen ? 'open' : ''}`} >
        <Link to="/" className="m-2">Home</Link>
        <Link to="/about" className="m-2">About</Link>
        <Link to="/services" className="m-2">Services</Link>
        <Link to="/career" className="m-2">Career</Link>
        <Link to="/portfolio" className="m-2">Portfolio</Link>
        <Link to="/blogs" className="m-2">Blogs</Link>
        <Link to="/contact" className="m-2">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

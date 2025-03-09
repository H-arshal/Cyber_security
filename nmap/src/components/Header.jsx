import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">NMAP</Link>
      </div>
      {isMobile && (
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li className={location.pathname === '/BasicCommand' ? 'active' : ''}>
          <Link to="/BasicCommand" onClick={() => setIsOpen(false)}>Basic</Link>
        </li>
        <li className={location.pathname === '/AdvanceCommand' ? 'active' : ''}>
          <Link to="/AdvanceCommand" onClick={() => setIsOpen(false)}>Advance</Link>
        </li>
        <li className={location.pathname === '/Simulator' ? 'active' : ''}>
          <Link to="/Simulator" onClick={() => setIsOpen(false)}>Simulator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

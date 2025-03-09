import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const NavbarContainer = styled.nav`
  background: #0a0a0a;
  color: #00ff00;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  border-bottom: 2px solid #00ff00;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavLinks = styled(motion.ul)`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #0a0a0a;
    border-bottom: 2px solid #00ff00;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const NavLink = styled(motion.li)`
  cursor: pointer;
  position: relative;

  &:hover {
    color: #00ff00;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #00ff00;
    bottom: -5px;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const MenuIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #00ff00;
    margin: 4px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  // Logo Animation
  const logoVariants = {
    hover: {
      scale: 1.1,
      textShadow: '0px 0px 8px #00ff00',
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <NavbarContainer>
      <Logo variants={logoVariants} whileHover="hover">
        <Link to="/" style={{ color: '#00ff00', textDecoration: 'none' }}>
          NMAP
        </Link>
      </Logo>
      {isMobile && (
        <MenuIcon onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MenuIcon>
      )}
      <NavLinks isOpen={isOpen}>
        <NavLink>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ color: '#00ff00', textDecoration: 'none' }}>
            Home
          </Link>
        </NavLink>
        <NavLink>
          <Link to="/BasicCommand" onClick={() => setIsOpen(false)} style={{ color: '#00ff00', textDecoration: 'none' }}>
            Basic
          </Link>
        </NavLink>
        <NavLink>
          <Link to="/AdvanceCommand" onClick={() => setIsOpen(false)} style={{ color: '#00ff00', textDecoration: 'none' }}>
            Advance
          </Link>
        </NavLink>
        <NavLink>
          <Link to="/Simulator" onClick={() => setIsOpen(false)} style={{ color: '#00ff00', textDecoration: 'none' }}>
            Simulator
          </Link>
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

import React from "react";
import "../App.css";
import logo from "../logo.png"; // Make sure your logo path is correct

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        <span className="title">C_E/D_T</span>
      </div>

      <nav className="navbar-inline">
        <a href="#caesar">Caesar</a>
        <a href="#vigenere">Vigenère</a>
        <a href="#frequency">Frequency</a>
        <a href="#mono">Mono</a>
        <a href="#homo">Homophonic</a>
        <a href="#playfair">Playfair</a>
        <a href="#hill">Hill</a>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import "../App.css"; // We'll create this for styling
import img from "./logo.png"
const Header = () => {
  return (
    <header className="header">
      <img src={img} alt="Site Logo" className="logo" />
      <h1 className="title">Ciph_EncryDecry Tools</h1>
    </header>
  );
};

export default Header;

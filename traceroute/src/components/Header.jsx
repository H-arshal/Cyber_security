import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <nav className="header-nav">
        <div className="header-container">
          <ul className="header-menu">
            <li className="header-item">
              <Link to="/" className={`header-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            </li>
            <li className="header-item">
              <Link to="/basic" className={`header-link ${location.pathname === "/basic" ? "active" : ""}`}>Basic</Link>
            </li>
            <li className="header-item">
              <Link to="/advance" className={`header-link ${location.pathname === "/advance" ? "active" : ""}`}>Advance</Link>
            </li>
            <li className="header-item">
              <Link to="/simulator" className={`header-link ${location.pathname === "/simulator" ? "active" : ""}`}>Simulator</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;

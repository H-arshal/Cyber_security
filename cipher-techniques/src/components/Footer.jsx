import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>🛡️ Built with curiosity & code by <strong>Harshal Moon</strong></p>
      <p>Cybersecurity Enthusiast | Passionate about Cryptography & Security Tools 🔐</p>

      <div className="social-links">
        <a href="https://harshal-portfolio-5mbz.onrender.com/" target="_blank" rel="noopener noreferrer">Portfolio</a>
        <span> | </span>
        <a href="https://github.com/h-arshal" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span> | </span>
        <a href="https://www.linkedin.com/in/harshal-moon-064956174/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span> | </span>
        <a href="mailto:harshalmoon@example.com" target="_blank" rel="noopener noreferrer">Email</a>
      </div>

      <p>© {new Date().getFullYear()} Ciph_EncryDecry Tools</p>
    </footer>
  );
};

export default Footer;

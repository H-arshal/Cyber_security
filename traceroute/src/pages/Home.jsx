import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "../App.css"; // Assuming you have a CSS file

const HomePage = () => {
  return (
    <div className="commands-container">
        <header>
          <h1>Nmap Scanner Guide</h1>
          <p>The ultimate guide to mastering Nmap scanning techniques!</p>
        </header>

        <section className="intro">
          <h2>What is Nmap?</h2>
          <p>
            Nmap (short for Network Mapper) is an open-source command-line tool
            used for scanning IP addresses, ports, and detecting installed
            applications on a network. It allows security professionals and
            network administrators to discover devices, detect open ports, and
            identify vulnerabilities.
          </p>
          <p>
            Originally developed by Gordon Lyon (Fyodor), Nmap has become widely
            popular in cybersecurity, even making appearances in movies like The
            Matrix and the series Mr. Robot.
          </p>
        </section>

        <section className="features">
          <h2>Why Use Nmap?</h2>
          <ul>
            <li>
              🔹 Quickly map out a network without complex configurations.
            </li>
            <li>
              🔹 Identify all connected devices, including servers, routers, and
              mobile devices.
            </li>
            <li>
              🔹 Detect running services and application versions for
              vulnerability assessments.
            </li>
            <li>
              🔹 Perform operating system detection to gather system
              information.
            </li>
            <li>
              🔹 Automate security audits using the Nmap Scripting Engine (NSE).
            </li>
            <li>🔹 Visualize network data with the Zenmap GUI.</li>
          </ul>
        </section>

        <section className="navigation">
          <h2>Explore</h2>
          <div className="nav-links">
            <Link to="/BasicCommand">📌 Basic Commands</Link>
            <Link to="/AdvanceCommand">⚡ Advanced Commands</Link>
          </div>
        </section>

        <footer>
          <p>Created by Harshal Moon for cybersecurity enthusiasts</p>
        </footer>
      </div>
  );
};

export default HomePage;

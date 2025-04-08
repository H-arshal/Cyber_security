import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "../App.css"; // Assuming you have a CSS file

const TraceroutePage = () => {
  return (
    <div className="traceroute-page">
      <div className="commands-container">
        <header>
          <h1>Traceroute Guide</h1>
          <p>
            Learn how to trace network routes and analyze connectivity issues!
          </p>
        </header>

        <section className="intro">
          <h2>What is Traceroute?</h2>
          <p>
            Traceroute is a network diagnostic tool used to track the pathway
            that packets take from your computer to a destination server. It
            helps network administrators and cybersecurity professionals
            understand routing paths, diagnose slow connections, and detect
            network issues.
          </p>
          <p>
            By displaying each hop along the route, Traceroute reveals delays,
            dropped packets, and potential bottlenecks. It is available on
            Windows (`tracert` command) and Linux/macOS (`traceroute` command).
          </p>
        </section>

        <section className="features">
          <h2>Why Use Traceroute?</h2>
          <ul>
            <li>🔹 Identify the exact route network packets take.</li>
            <li>🔹 Detect network latency issues and slow connections.</li>
            <li>🔹 Troubleshoot routing problems and ISP bottlenecks.</li>
            <li>
              🔹 Determine if a connection failure is due to your ISP or the
              destination server.
            </li>
            <li>
              🔹 Analyze network performance by measuring response times at each
              hop.
            </li>
            <li>
              🔹 Useful for ethical hacking and penetration testing to map
              network structures.
            </li>
          </ul>
        </section>

        <section className="navigation">
          <h2>Explore</h2>
          <div className="nav-links">
            <Link to="/basic">📌 Basic Traceroute Commands</Link>
            <Link to="/advance">
              ⚡ Advanced Traceroute Techniques
            </Link>
          </div>
        </section>

        <footer>
          <p>Created by Harshal Moon for cybersecurity enthusiasts</p>
        </footer>
      </div>
    </div>
  );
};

export default TraceroutePage;

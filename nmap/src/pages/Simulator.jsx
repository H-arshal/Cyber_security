import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Simulator = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle command execution
  const executeCommand = () => {
    if (!command.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const ipMatch = command.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b|(?:[a-fA-F0-9:]+:+)+[a-fA-F0-9]+\b/);
      const ip = ipMatch ? ipMatch[0] : "unknown IP";

      const nmapResponses = {
        [`nmap -sS ${ip}`]: `Starting Nmap 7.92 ( https://nmap.org )\nHost ${ip} is up (0.0023s latency).\nNot shown: 998 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http`,

        [`nmap -sT ${ip}`]: `Starting Nmap 7.92 ( https://nmap.org )\nHost ${ip} is up (0.0012s latency).\nPORT   STATE SERVICE\n21/tcp open  ftp\n23/tcp open  telnet\n443/tcp open  https`,

        [`nmap -O ${ip}`]: `Starting Nmap 7.92\nHost ${ip} is up (0.001s latency).\nDevice Type: Router\nRunning: Linux 3.X\nOS CPE: cpe:/o:linux:linux_kernel:3`,
      };

      const response = nmapResponses[command] || `Error: Invalid or unsupported command for ${ip}.`;
      setOutput(prev => prev + `\n> ${command}\n${response}\n`);
      setHistory([...history, command]);
      setCommand("");
      setLoading(false);
    }, Math.random() * 2000 + 1000); // Random scan delay
  };

  return (
    <div className="terminal-container">
      <h2>Nmap Simulator</h2>
      <div className="terminal">
        <div className="input-line">
          <span>$</span>
          <input
            type="text"
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeCommand()}
            placeholder="Enter Nmap command..."
            />
        </div>
            {loading && <p className="loading">Scanning... 🔄</p>}
            <pre>{output || "Welcome to Nmap Simulator. Enter a command to start."}</pre>
      </div>
      <div className="history">
        <h3>Command History</h3>
        <ul>
          {history.map((cmd, index) => (
            <li key={index}>{cmd}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Simulator;

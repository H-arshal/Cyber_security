import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const TracerouteSimulator = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Function to generate simulated traceroute responses
  const generateResponse = (command, target) => {
    const traceroutes = {
      "traceroute google.com": `Tracing route to google.com [142.250.190.46]\n1  192.168.1.1  [Router]  2ms\n2  ISP Node  10ms\n3  Data Center  20ms\n4  google.com  25ms\nTrace complete.`,

      "traceroute facebook.com": `Tracing route to facebook.com [157.240.22.35]\n1  192.168.1.1  [Router]  3ms\n2  ISP Node  12ms\n3  Data Center  30ms\n4  facebook.com  40ms\nTrace complete.`,

      "traceroute github.com": `Tracing route to github.com [20.205.243.166]\n1  192.168.1.1  [Router]  5ms\n2  ISP Node  18ms\n3  Cloud Network  35ms\n4  github.com  50ms\nTrace complete.`,

      "traceroute amazon.com": `Tracing route to amazon.com [176.32.103.205]\n1  192.168.1.1  [Router]  4ms\n2  ISP Node  15ms\n3  AWS Data Center  28ms\n4  amazon.com  42ms\nTrace complete.`,

      "traceroute yahoo.com": `Tracing route to yahoo.com [98.137.11.163]\n1  192.168.1.1  [Router]  2ms\n2  ISP Node  14ms\n3  Yahoo Data Center  27ms\n4  yahoo.com  38ms\nTrace complete.`,
    };

    return traceroutes[command] || `Error: Invalid or unsupported command for ${target}.`;
  };

  // Handle command execution
  const executeCommand = () => {
    if (!command.trim()) return;
    setLoading(true);

    setTimeout(() => {
      // Extract the target domain/IP
      const targetMatch = command.match(/\b(?:[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/);
      const target = targetMatch ? targetMatch[0] : "Unknown target";

      // Generate response dynamically
      const response = generateResponse(command, target);
      setOutput((prev) => prev + `\n> ${command}\n${response}\n`);
      setHistory([...history, command]);
      setCommand("");
      setLoading(false);
    }, Math.random() * 2000 + 1000); // Simulate delay

  };

  return (
    <div className="terminal-container">
      <h2>Traceroute Simulator</h2>
      <div className="terminal">
        <pre>
          {output || "Welcome to Traceroute Simulator. Enter a command to start."}
        </pre>
        {loading && <p className="loading">Tracing route... 🔄</p>}
        <div className="input-line">
          <span>$</span>
          <input
            type="text"
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeCommand()}
            placeholder="Enter traceroute command..."
          />
        </div>
      </div>
      <div className="history">
        <h3>Command History</h3>
        <ul>
          {history.map((cmd, index) => (
            <li key={index}>{cmd}</li>
          ))}
        </ul>
      </div>
      <footer>
        <p>
          This simulator provides predefined responses and does not perform
          actual network tracing.
        </p>
        <p>Created by Harshal Moon for cybersecurity enthusiasts</p>
      </footer>
    </div>
  );
};

export default TracerouteSimulator;

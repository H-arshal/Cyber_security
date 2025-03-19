import React from "react";
import "../App.css"; // Import your CSS for styling

const BasicCommand = () => {
  const commands = [
    { command: "traceroute target.com", description: "Perform a basic traceroute." },
    { command: "traceroute -m 30 target.com", description: "Limit the number of hops to 30 (default value)." },
    { command: "traceroute -n target.com", description: "Disable hostname resolution (faster results)." },
    { command: "traceroute -w 3 target.com", description: "Set a 3-second timeout per hop." },
    { command: "traceroute -I target.com", description: "Use ICMP instead of UDP (like Windows tracert)." },
    { command: "traceroute -T target.com", description: "Use TCP SYN packets instead of default UDP." },
    { command: "tracert target.com", description: "Windows equivalent of traceroute." },
  ];

  return (
    <div className="commands-container">
      <h2>Basic Traceroute Commands</h2>
      <ul>
        {commands.map((cmd, index) => (
          <li key={index}>
            <code>{cmd.command}</code> {cmd.description}
          </li>
        ))}
      </ul>
      <footer>
        <p>Created by Harshal Moon for cybersecurity enthusiasts</p>
      </footer>
    </div>
  );
};

export default BasicCommand;

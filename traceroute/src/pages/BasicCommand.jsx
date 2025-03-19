import React from "react";
import "../App.css"; // Import your CSS for styling

const BasicCommands = () => {
  const commands = [
    { command: "nmap target.com", description: "Scan a single target." },
    { command: "nmap 192.168.1.1 192.168.1.2", description: "Scan multiple targets." },
    { command: "nmap 192.168.1.1-100", description: "Scan a range of IP addresses." },
    { command: "nmap 192.168.1.0/24", description: "Scan an entire subnet." },
    { command: "nmap -p 1-1000 target.com", description: "Scan for open ports." },
    { command: "nmap -p 22,80,443 target.com", description: "Scan specific ports." },
    { command: "nmap -p- target.com", description: "Scan all ports (1-65535)." },
    { command: "nmap -O target.com", description: "Detect operating system." },
    { command: "nmap -sV target.com", description: "Detect service versions." },
    { command: "nmap -sn target.com", description: "Ping scan (No port scan)." },
    { command: "nmap -A target.com", description: "Aggressive scan with OS detection and scripts." },
    { command: "nmap -sS target.com", description: "Stealthy SYN scan." },
    { command: "nmap -sT target.com", description: "TCP Connect scan." },
    { command: "nmap -sU target.com", description: "Scan for open UDP ports." },
    { command: "nmap -F target.com", description: "Fast scan (Top 100 common ports)." },
    { command: "nmap -v target.com", description: "Scan with verbose output." },
    { command: "nmap -oN output.txt target.com", description: "Save results in normal format." },
    { command: "nmap -oX output.xml target.com", description: "Save results in XML format." },
    { command: "nmap -oG output.gnmap target.com", description: "Save results in Grepable format." },
    { command: "nmap -n target.com", description: "Scan without DNS resolution." },
    { command: "nmap --traceroute target.com", description: "Perform a traceroute." },
    { command: "nmap --script=vuln target.com", description: "Check for common vulnerabilities." },
    { command: "nmap -g 53 target.com", description: "Scan using a specific source port." },
    { command: "nmap -e eth0 target.com", description: "Scan using a specific network interface." },
    { command: "nmap -iL targets.txt", description: "Scan from a list of targets." },
    { command: "nmap -T4 target.com", description: "Set scan speed (Aggressive timing)." },
    { command: "nmap -T0 target.com", description: "Paranoid timing (Very slow)." },
    { command: "nmap -p 443 --script=ssl-heartbleed target.com", description: "Scan for Heartbleed vulnerability." },
    { command: "nmap --script=dns-brute target.com", description: "Retrieve DNS information." },
    { command: "nmap --script=http-enum target.com", description: "Enumerate HTTP services." },
  ];

  return (
    <div className="commands-container">
      <h2>Basic Nmap Commands</h2>
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

export default BasicCommands;

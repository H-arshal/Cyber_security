import React from "react";
import "../App.css"; // Import your CSS for styling

const AdvancedCommands = () => {
  const commands = [
    { command: "nmap -sS target.com", description: "Perform a stealthy SYN scan." },
    { command: "nmap -sU target.com", description: "Scan for open UDP ports." },
    { command: "nmap -sT target.com", description: "Perform a full TCP connection scan." },
    { command: "nmap -f target.com", description: "Fragment packets to evade detection." },
    { command: "nmap -D RND:10 target.com", description: "Use decoy IPs to hide your real IP." },
    { command: "nmap -S spoofed_ip target.com", description: "Spoof the source IP address." },
    { command: "nmap -e eth0 target.com", description: "Scan using a specific network interface." },
    { command: "nmap -g 53 target.com", description: "Scan using a specific source port." },
    { command: "nmap --script=default target.com", description: "Run default NSE scripts." },
    { command: "nmap --script=vuln target.com", description: "Use NSE scripts to detect vulnerabilities." },
    { command: "nmap -oN output.txt target.com", description: "Save output to a file." },
    { command: "nmap --traceroute target.com", description: "Perform a traceroute." },
    { command: "nmap -6 target.com", description: "Scan an IPv6 address." },
    { command: "nmap 192.168.1.0/24 --exclude 192.168.1.100", description: "Exclude specific hosts from scan." },
    { command: "nmap -iL targets.txt", description: "Scan a list of targets from a file." },
    { command: "nmap -sA target.com", description: "Detect firewall rules." },
    { command: "nmap -sI zombie_ip target.com", description: "Perform an idle scan using a zombie host." },
    { command: "nmap --script=/path/to/script.nse target.com", description: "Run a custom NSE script." },
    { command: "nmap -p 443 --script=ssl-heartbleed target.com", description: "Check for Heartbleed vulnerability." },
  ];

  return (
    <div className="commands-container">
      <h2>Advanced Nmap Commands</h2>
      <ul>
        {commands.map((cmd, index) => (
          <li key={index}>
            <code>{cmd.command}</code> {cmd.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedCommands;

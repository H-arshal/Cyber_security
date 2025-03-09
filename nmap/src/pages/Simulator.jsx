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

  // Function to generate dynamic Nmap responses
  const generateResponse = (command, ip) => {
    const responses = {
      nmap: `Starting Nmap 7.92\nHost ${ip} is up.\nNot shown: 999 closed ports\nPORT   STATE SERVICE\n80/tcp open  http`,

      "nmap -sS": `Starting Nmap 7.92\nHost ${ip} is up.\nNot shown: 998 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http`,

      "nmap -sT": `Starting Nmap 7.92\nHost ${ip} is up.\nPORT   STATE SERVICE\n21/tcp open  ftp\n23/tcp open  telnet\n443/tcp open  https`,

      "nmap -O": `Starting Nmap 7.92\nHost ${ip} is up.\nDevice Type: Router\nRunning: Linux 3.X\nOS CPE: cpe:/o:linux:linux_kernel:3`,

      "nmap -p 80": `Starting Nmap 7.92\nHost ${ip} is up.\nPORT   STATE SERVICE\n80/tcp open  http`,

      "nmap -p-": `Starting Nmap 7.92\nHost ${ip} is up.\nNot shown: 65530 closed ports\nPORT     STATE SERVICE\n21/tcp   open  ftp\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https`,

      "nmap --script=vuln": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning for vulnerabilities...\n- Vulnerable to CVE-2021-3156 (Sudo Buffer Overflow)\n- Possible SMB Ghost vulnerability detected`,

      "nmap -sn": `Starting Nmap 7.92\nHost ${ip} is up (0.0023s latency).\nNo ports scanned.`,

      "nmap -6": `Starting Nmap 7.92\nScanning IPv6 target...\nHost ${ip} is up.\nNot shown: 999 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh`,

      "nmap -sV": `Starting Nmap 7.92\nHost ${ip} is up.\nPORT   STATE SERVICE  VERSION\n80/tcp open  http     Apache 2.4.41`,

      "nmap -A": `Starting Nmap 7.92\nHost ${ip} is up.\nAggressive scan results: OS detected as Linux, running Apache.`,

      "nmap -sU": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning for open UDP ports...\nPORT   STATE SERVICE\n161/udp open  snmp`,

      "nmap -F": `Starting Nmap 7.92\nHost ${ip} is up.\nFast scan results: 80, 443 open.`,

      "nmap -v": `Starting Nmap 7.92 (Verbose Mode)\nScanning ${ip}...\nHost is up.\nScanning completed.`,

      "nmap -oN output.txt": `Starting Nmap 7.92\nHost ${ip} is up.\nScan results saved to output.txt.`,

      "nmap -oX output.xml": `Starting Nmap 7.92\nHost ${ip} is up.\nScan results saved in XML format.`,

      "nmap -oG output.gnmap": `Starting Nmap 7.92\nHost ${ip} is up.\nScan results saved in Grepable format.`,

      "nmap -n": `Starting Nmap 7.92\nHost ${ip} is up.\nSkipping DNS resolution.`,

      "nmap --traceroute": `Starting Nmap 7.92\nTraceroute results:\n1  Router (192.168.1.1)\n2  ISP Node\n3  Data Center`,

      "nmap -g 53": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning using source port 53...`,

      "nmap -e eth0": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning using network interface eth0.`,

      "nmap -iL targets.txt": `Starting Nmap 7.92\nScanning hosts from targets.txt...\nMultiple hosts detected.`,

      "nmap -T4": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning with aggressive timing (T4)...`,

      "nmap -T0": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning with paranoid timing (T0)...`,

      "nmap -p 443 --script=ssl-heartbleed": `Starting Nmap 7.92\nHost ${ip} is up.\nChecking for Heartbleed...\n- Vulnerable!`,

      "nmap --script=dns-brute": `Starting Nmap 7.92\nHost ${ip} is up.\nDNS Brute-force results:\n- sub1.${ip}\n- sub2.${ip}`,

      "nmap --script=http-enum": `Starting Nmap 7.92\nHost ${ip} is up.\nEnumerating HTTP services...`,

      "nmap -f": `Starting Nmap 7.92\nHost ${ip} is up.\nFragmenting packets to evade detection.`,

      "nmap -D RND:10": `Starting Nmap 7.92\nUsing 10 random decoy IPs...`,

      "nmap -S spoofed_ip": `Starting Nmap 7.92\nHost ${ip} is up.\nSpoofing source IP address.`,

      "nmap --script=default": `Starting Nmap 7.92\nHost ${ip} is up.\nRunning default NSE scripts...`,

      "nmap 192.168.1.0/24 --exclude 192.168.1.100": `Starting Nmap 7.92\nScanning subnet 192.168.1.0/24 excluding 192.168.1.100...`,

      "nmap -sA": `Starting Nmap 7.92\nHost ${ip} is up.\nScanning for firewall rules...`,

      "nmap -sI zombie_ip": `Starting Nmap 7.92\nHost ${ip} is up.\nPerforming idle scan using zombie host.`,

      "nmap --script=/path/to/script.nse": `Starting Nmap 7.92\nHost ${ip} is up.\nRunning custom NSE script...`,
    };

    // Extract the base command (e.g., "nmap -sS" from "nmap -sS 192.168.1.1")
    const baseCommand = command.split(" ").slice(0, -1).join(" ");
    return (
      responses[baseCommand] ||
      `Error: Invalid or unsupported command for ${ip}.`
    );
  };

  // Handle command execution
  const executeCommand = () => {
    if (!command.trim()) return;
    setLoading(true);

    setTimeout(() => {
      // Extract IP address from the command
      const ipMatch = command.match(
        /\b(?:\d{1,3}\.){3}\d{1,3}\b|(?:[a-fA-F0-9:]+:+)+[a-fA-F0-9]+\b/
      );
      const ip = ipMatch ? ipMatch[0] : "No IP provided";

      // Generate response dynamically
      const response = generateResponse(command, ip);
      setOutput((prev) => prev + `\n> ${command}\n${response}\n`);
      setHistory([...history, command]);
      setCommand("");
      setLoading(false);
    }, Math.random() * 2000 + 1000); // Random scan delay
  };

  return (
    <div className="terminal-container">
      <h2>Nmap Simulator</h2>
      <div className="terminal">
        <pre>
          {output || "Welcome to Nmap Simulator. Enter a command to start."}
        </pre>
        {loading && <p className="loading">Scanning... 🔄</p>}
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
          actual port scanning.
        </p>
</footer>
      <footer>

        <p>Created by Harshal Moon for cybersecurity enthusiasts</p>
      </footer>
    </div>
  );
};

export default Simulator;

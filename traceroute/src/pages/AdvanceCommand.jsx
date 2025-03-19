import React from "react";
import "../App.css"; // Import your CSS for styling

const AdvancedCommand = () => {
  const commands = [
    { command: "traceroute -T target.com", description: "Use TCP SYN packets instead of default UDP." },
    { command: "traceroute -I target.com", description: "Use ICMP Echo Request (like Windows tracert)." },
    { command: "traceroute -U -p 53 target.com", description: "Send UDP packets to port 53 (DNS)." },
    { command: "traceroute -P GRE target.com", description: "Trace routes using GRE (Generic Routing Encapsulation)." },
    { command: "traceroute -F target.com", description: "Set 'Don't Fragment' flag to test MTU path." },
    { command: "traceroute --mtu target.com", description: "Discover the path MTU (Maximum Transmission Unit)." },
    { command: "traceroute -m 20 target.com", description: "Limit the maximum hops to 20." },
    { command: "traceroute -n target.com", description: "Disable hostname resolution for faster tracing." },
    { command: "traceroute -q 5 target.com", description: "Send 5 packets per hop instead of the default 3." },
    { command: "traceroute -z 2 target.com", description: "Set a delay of 2 milliseconds between probes." },
    { command: "traceroute -w 1.5 target.com", description: "Set a 1.5-second timeout per probe." },
    { command: "traceroute -A target.com", description: "Show Autonomous System (AS) numbers for each hop." },
    { command: "traceroute -g 192.168.1.1 target.com", description: "Specify a gateway to pass through." },
    { command: "traceroute --back target.com", description: "Perform a reverse route trace (if supported)." },
    { command: "traceroute --sport=4444 target.com", description: "Specify a custom source port (useful for bypassing firewalls)." },
    { command: "traceroute --tcp-mss=1300 target.com", description: "Manually set the TCP Maximum Segment Size (MSS)." },
    { command: "tcptraceroute target.com 443", description: "Perform a TCP traceroute to port 443." },
    { command: "mtr --report target.com", description: "Use MTR (advanced traceroute with live monitoring)." },
    { command: "mtr -4 target.com", description: "Force IPv4 in MTR." },
    { command: "mtr -6 target.com", description: "Force IPv6 in MTR." },
  ];

  return (
    <div className="commands-container">
      <h2>Advanced Traceroute Commands</h2>
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

export default AdvancedCommand;

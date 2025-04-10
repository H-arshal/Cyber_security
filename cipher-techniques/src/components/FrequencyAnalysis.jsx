import { useState } from "react";
import '../App.css';

const FrequencyAnalysis = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const frequencyAnalysis = () => {
    const frequency = {};
    for (let char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) {
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }

    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const result = sorted.map(([char, count]) => `${char.toUpperCase()}: ${count}`).join("\n");

    setOutput(result);
  };

  return (
    <div>
      <h2>Frequency Analysis (for Caesar Break)</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter encrypted text" />
      <button onClick={frequencyAnalysis}>Analyze</button>
      <p><strong>Result:</strong><br></br> {output}</p>
    </div>
  );
};

export default FrequencyAnalysis;

import React, { useState } from "react";
import "../App.css";
// Monoalphabetic cipher logic
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encryptMonoalphabetic(plaintext, keyMap) {
  plaintext = plaintext.toUpperCase();
  return plaintext
    .split("")
    .map((char) => (alphabet.includes(char) ? keyMap[char] : char))
    .join("");
}

function decryptMonoalphabetic(ciphertext, keyMap) {
  const reverseMap = Object.fromEntries(
    Object.entries(keyMap).map(([k, v]) => [v, k])
  );
  ciphertext = ciphertext.toUpperCase();
  return ciphertext
    .split("")
    .map((char) => (alphabet.includes(char) ? reverseMap[char] : char))
    .join("");
}

function generateRandomKey() {
  const shuffled = [...alphabet].sort(() => Math.random() - 0.5);
  return Object.fromEntries(
    alphabet.split("").map((ch, i) => [ch, shuffled[i]])
  );
}

// Main Component
export default function MonoalphabeticCipherTool() {
  const [text, setText] = useState("");
  const [keyMap, setKeyMap] = useState(generateRandomKey());
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");

  const handleProcess = () => {
    const result =
      mode === "encrypt"
        ? encryptMonoalphabetic(text, keyMap)
        : decryptMonoalphabetic(text, keyMap);
    setOutput(result);
  };

  return (
    <div>
      <h2>Monoalphabetic Cipher</h2>

      <textarea
        placeholder="Enter your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        <label>
          <strong>Mode:</strong>
        </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="encrypt">Encrypt</option>
          <option value="decrypt">Decrypt</option>
        </select>
      </div>

      <button onClick={handleProcess}>Process</button>
      <button onClick={() => setKeyMap(generateRandomKey())}>
        Generate New Key
      </button>

      <h3>Output:</h3>
      <pre>{output}</pre>

      <h4>Key Map:</h4>
      <pre>{JSON.stringify(keyMap, null, 2)}</pre>
    </div>
  );
}

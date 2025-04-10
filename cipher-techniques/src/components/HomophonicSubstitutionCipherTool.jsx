import React, { useState } from 'react';
import "../App.css";
// Example cipher map (1-to-many for common letters)
const homophonicMap = {
  A: ['!', '1'],
  B: ['@'],
  C: ['#'],
  D: ['$'],
  E: ['%', '2', '8'],
  F: ['^'],
  G: ['&'],
  H: ['*'],
  I: ['(', '9'],
  J: [')'],
  K: ['-'],
  L: ['_'],
  M: ['+'],
  N: ['='],
  O: ['{', '0'],
  P: ['}'],
  Q: ['['],
  R: [']'],
  S: [':'],
  T: [';'],
  U: ['<'],
  V: ['>'],
  W: ['?'],
  X: ['/'],
  Y: ['|'],
  Z: ['~']
};

const reverseMap = Object.entries(homophonicMap).reduce((acc, [letter, symbols]) => {
  symbols.forEach(symbol => acc[symbol] = letter);
  return acc;
}, {});

function encryptHomophonic(plaintext) {
  plaintext = plaintext.toUpperCase();
  return plaintext.split('').map(char => {
    if (homophonicMap[char]) {
      const choices = homophonicMap[char];
      return choices[Math.floor(Math.random() * choices.length)];
    }
    return char;
  }).join('');
}

function decryptHomophonic(ciphertext) {
  return ciphertext.split('').map(char => {
    return reverseMap[char] || char;
  }).join('');
}

export default function HomophonicSubstitutionCipherTool() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    const result = mode === 'encrypt'
      ? encryptHomophonic(text)
      : decryptHomophonic(text);
    setOutput(result);
  };

  return (
    <div>
      <h2>Homophonic Substitution Cipher</h2>

      <textarea
        placeholder="Enter your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="toggle-mode">
        <button
          className={mode === 'encrypt' ? 'toggle active' : 'toggle'}
          onClick={() => setMode('encrypt')}
        >
          Encrypt
        </button>
        <button
          className={mode === 'decrypt' ? 'toggle active' : 'toggle'}
          onClick={() => setMode('decrypt')}
        >
          Decrypt
        </button>
      </div>

      <button onClick={handleProcess}>Process</button>

      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

import React, { useState } from 'react';

function generateMatrix(key) {
  key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let seen = new Set();
  let matrix = [];

  key.split('').forEach(char => {
    if (!seen.has(char)) {
      seen.add(char);
      matrix.push(char);
    }
  });

  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(65 + i);
    if (char === 'J') continue;
    if (!seen.has(char)) {
      seen.add(char);
      matrix.push(char);
    }
  }

  let grid = [];
  while (matrix.length) {
    grid.push(matrix.splice(0, 5));
  }

  return grid;
}

function findPosition(matrix, letter) {
  for (let i = 0; i < 5; i++) {
    const row = matrix[i];
    const col = row.indexOf(letter);
    if (col !== -1) return { row: i, col };
  }
}

function formatText(text) {
  text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let result = '';

  for (let i = 0; i < text.length; i++) {
    result += text[i];
    if (i < text.length - 1 && text[i] === text[i + 1]) {
      result += 'X';
    }
  }

  if (result.length % 2 !== 0) result += 'X';
  return result;
}

function encryptPlayfair(text, key) {
  const matrix = generateMatrix(key);
  const formatted = formatText(text);
  let result = '';

  for (let i = 0; i < formatted.length; i += 2) {
    const a = formatted[i];
    const b = formatted[i + 1];
    const posA = findPosition(matrix, a);
    const posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      result += matrix[posA.row][(posA.col + 1) % 5];
      result += matrix[posB.row][(posB.col + 1) % 5];
    } else if (posA.col === posB.col) {
      result += matrix[(posA.row + 1) % 5][posA.col];
      result += matrix[(posB.row + 1) % 5][posB.col];
    } else {
      result += matrix[posA.row][posB.col];
      result += matrix[posB.row][posA.col];
    }
  }

  return result;
}

function decryptPlayfair(text, key) {
  const matrix = generateMatrix(key);
  let result = '';

  for (let i = 0; i < text.length; i += 2) {
    const a = text[i];
    const b = text[i + 1];
    const posA = findPosition(matrix, a);
    const posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      result += matrix[posA.row][(posA.col + 4) % 5];
      result += matrix[posB.row][(posB.col + 4) % 5];
    } else if (posA.col === posB.col) {
      result += matrix[(posA.row + 4) % 5][posA.col];
      result += matrix[(posB.row + 4) % 5][posB.col];
    } else {
      result += matrix[posA.row][posB.col];
      result += matrix[posB.row][posA.col];
    }
  }

  return result;
}

export default function PlayfairCipherTool() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    if (!key.trim()) {
      setOutput('Key is required!');
      return;
    }

    const result = mode === 'encrypt'
      ? encryptPlayfair(text, key)
      : decryptPlayfair(text, key);
    setOutput(result);
  };

  return (
    <div>
      <h2>Playfair Cipher</h2>

      <input
        type="text"
        placeholder="Enter key (no J allowed)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

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

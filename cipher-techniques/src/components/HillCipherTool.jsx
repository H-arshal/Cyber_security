import React, { useState } from 'react';

const modInverse = (a, m) => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
};

const getMatrixInverse = (matrix, size) => {
  const mod = 26;
  let det;

  if (size === 2) {
    det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  } else {
    det = matrix[0][0]*(matrix[1][1]*matrix[2][2]-matrix[1][2]*matrix[2][1])
        - matrix[0][1]*(matrix[1][0]*matrix[2][2]-matrix[1][2]*matrix[2][0])
        + matrix[0][2]*(matrix[1][0]*matrix[2][1]-matrix[1][1]*matrix[2][0]);
  }

  det = ((det % mod) + mod) % mod;
  const invDet = modInverse(det, mod);
  if (invDet === null) return null;

  let inv;

  if (size === 2) {
    inv = [
      [ matrix[1][1], -matrix[0][1]],
      [-matrix[1][0],  matrix[0][0]],
    ];
  } else {
    inv = [];
    for (let i = 0; i < 3; i++) {
      inv.push([]);
      for (let j = 0; j < 3; j++) {
        const sub = matrix
          .filter((_, r) => r !== i)
          .map(row => row.filter((_, c) => c !== j));
        const subDet = sub[0][0] * sub[1][1] - sub[0][1] * sub[1][0];
        const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * subDet;
        inv[i][j] = cofactor;
      }
    }
    inv = inv[0].map((_, i) => inv.map(row => row[i])); // transpose
  }

  return inv.map(row =>
    row.map(num => ((num * invDet) % mod + mod) % mod)
  );
};

const textToMatrix = (text, size) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
  const padding = size - (clean.length % size);
  const fullText = clean + 'X'.repeat(padding === size ? 0 : padding);
  const vectors = [];

  for (let i = 0; i < fullText.length; i += size) {
    const vec = [];
    for (let j = 0; j < size; j++) {
      vec.push(fullText.charCodeAt(i + j) - 65);
    }
    vectors.push(vec);
  }

  return vectors;
};

const matrixMultiply = (vec, matrix, size) => {
  return vec.map(row =>
    matrix[0].map((_, j) =>
      row.reduce((sum, val, k) => sum + val * matrix[k][j], 0) % 26
    )
  );
};

const matrixToText = (matrix) => {
  return matrix
    .flat()
    .map(num => String.fromCharCode((num % 26) + 65))
    .join('');
};

export default function HillCipherTool() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [matrixSize, setMatrixSize] = useState(2);
  const [keyMatrix, setKeyMatrix] = useState(Array(2).fill().map(() => Array(2).fill('')));
  const [output, setOutput] = useState('');

  const handleMatrixSizeChange = (size) => {
    setMatrixSize(size);
    setKeyMatrix(Array(size).fill().map(() => Array(size).fill('')));
  };

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = keyMatrix.map(row => [...row]);
    newMatrix[i][j] = value;
    setKeyMatrix(newMatrix);
  };

  const parseMatrix = () => {
    return keyMatrix.map(row => row.map(num => parseInt(num)));
  };

  const handleProcess = () => {
    try {
      const numericMatrix = parseMatrix();
      const vectors = textToMatrix(text, matrixSize);
      const key = mode === 'decrypt' ? getMatrixInverse(numericMatrix, matrixSize) : numericMatrix;

      if (!key) {
        setOutput("Key matrix is not invertible modulo 26!");
        return;
      }

      const resultMatrix = matrixMultiply(vectors, key, matrixSize);
      const resultText = matrixToText(resultMatrix);
      setOutput(resultText);
    } catch (e) {
      setOutput("Invalid input or matrix.");
    }
  };

  return (
    <div>
      <h2>Hill Cipher</h2>

      <textarea
        placeholder="Enter your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Matrix Size:</strong>
        <button onClick={() => handleMatrixSizeChange(2)} className={matrixSize === 2 ? 'toggle active' : 'toggle'}>2x2</button>
        <button onClick={() => handleMatrixSizeChange(3)} className={matrixSize === 3 ? 'toggle active' : 'toggle'}>3x3</button>
      </div>

      <div
  style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${matrixSize}, 60px)`,
    gap: '1rem', // Increased from 0.5rem to 1rem
    marginBottom: '1.5rem',
  }}
>
  {keyMatrix.map((row, i) =>
    row.map((val, j) => (
      <input
        key={`${i}-${j}`}
        type="number"
        value={val}
        onChange={(e) => handleMatrixChange(i, j, e.target.value)}
        style={{
          padding: '0.4rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      />
    ))
  )}
</div>


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

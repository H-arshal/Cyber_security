import { useState } from "react";
import '../App.css';

const CaesarCipher = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const handleEncrypt = () => {
    const encrypted = text.replace(/[a-z]/gi, (char) => {
      const offset = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - offset + parseInt(shift)) % 26) + offset);
    });
    setOutput(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = text.replace(/[a-z]/gi, (char) => {
      const offset = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - offset - parseInt(shift) + 26) % 26) + offset);
    });
    setOutput(decrypted);
  };

  return (
    <div>
      <h2>Caesar Cipher</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
      <input type="number" value={shift} onChange={(e) => setShift(e.target.value)} />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p><strong>Result:</strong> {output}</p>
    </div>
  );
};

export default CaesarCipher;

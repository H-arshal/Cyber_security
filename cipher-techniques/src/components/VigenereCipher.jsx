import { useState } from "react";
import '../App.css';

const VigenereCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const encrypt = (text, key) => {
    let result = "";
    key = key.toLowerCase().replace(/[^a-z]/g, "");
    let keyIndex = 0;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;

      if (/[a-z]/i.test(char)) {
        const charCode = ((char.toLowerCase().charCodeAt(0) - 97 + (key.charCodeAt(keyIndex % key.length) - 97)) % 26);
        result += String.fromCharCode(charCode + base);
        keyIndex++;
      } else {
        result += char;
      }
    }

    return result;
  };

  const decrypt = (text, key) => {
    let result = "";
    key = key.toLowerCase().replace(/[^a-z]/g, "");
    let keyIndex = 0;

    for (let char of text) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;

      if (/[a-z]/i.test(char)) {
        const charCode = ((char.toLowerCase().charCodeAt(0) - 97 - (key.charCodeAt(keyIndex % key.length) - 97) + 26) % 26);
        result += String.fromCharCode(charCode + base);
        keyIndex++;
      } else {
        result += char;
      }
    }

    return result;
  };

  return (
    <div>
      <h2>Vigenère Cipher</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key" />
      <button onClick={() => setOutput(encrypt(text, key))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, key))}>Decrypt</button>
      <p><strong>Result:</strong> {output}</p>
    </div>
  );
};

export default VigenereCipher;

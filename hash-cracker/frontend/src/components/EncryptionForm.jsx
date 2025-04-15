import { useState } from "react";
import { encryptPass } from "../service/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const EncryptionForm = () => {
  const [pt, setPt] = useState("");
  const [algo, setAlgo] = useState("MD5");
  const [encryptedResult, setEncryptedResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await encryptPass(pt, algo);
      setEncryptedResult(result);
      toast.success("Encrypted successfully!");  
    } catch (error) {
      setEncryptedResult("Failed to encrypt.");
      toast.error("Failed to encrypt!");  
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encryptedResult)
      .then(() => {
        toast.success("Copied to clipboard!");  
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy!");  
      });
  };

  return (
    <div className="container">
      <h1>Password Encryption</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Plain Text:</label>
        <input 
          type="text" 
          value={pt} 
          onChange={(e) => setPt(e.target.value)} 
          required 
        />

        <label>Choose Algorithm:</label>
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
        </select>

        <button type="submit">Encrypt</button>
      </form>

      {encryptedResult && (
        <div className="result" onClick={handleCopy}>
          <strong>Encrypted Text:</strong> {encryptedResult}
        </div>
      )}

      {/* ToastContainer to display the toasts */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}  
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default EncryptionForm;

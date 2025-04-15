import { useState } from "react";
import { decryptPass } from "../service/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const DecryptionForm = () => {
  const [ct, setCt] = useState("");
  const [algo, setAlgo] = useState("MD5");
  const [decryptedResult, setDecryptedResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await decryptPass(ct, algo);
      setDecryptedResult(result);
      toast.success("Decrypted successfully!");  
    } catch (error) {
      setDecryptedResult("Failed to decrypt.");
      toast.error("Failed to decrypt!");  
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decryptedResult)
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
      <h1>Password Decryption</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Encrypted Text:</label>
        <input 
          type="text" 
          value={ct} 
          onChange={(e) => setCt(e.target.value)} 
          required 
        />

        <label>Choose Algorithm:</label>
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
        </select>

        <button type="submit">Decrypt</button>
      </form>

      {decryptedResult && (
        <div className="result" onClick={handleCopy}>
          <strong>Decrypted Text:</strong> {decryptedResult}
        </div>
      )}

      {/* ToastContainer to display the toasts */}
      <ToastContainer 
        position="top-right" 
        autoClose={1500}  
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default DecryptionForm;

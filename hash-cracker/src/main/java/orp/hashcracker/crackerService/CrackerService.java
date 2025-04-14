package orp.hashcracker.crackerService;


import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class CrackerService {

    public String crackPassword(String hashedPassword, String algorithm) {
        try {
            // Initialize MessageDigest with the algorithm
            MessageDigest md = MessageDigest.getInstance(algorithm);

            // Read wordlist.txt from resources folder
            BufferedReader br = new BufferedReader(new FileReader("D:\\COEP\\Cyber_Security_Project\\hash-cracker\\src\\main\\java\\orp\\hashcracker\\crackerService\\data\\data.txt"));
            String line;

            while ((line = br.readLine()) != null) {
                // Hash the word from wordlist
                byte[] hashBytes = md.digest(line.getBytes());
                String generatedHash = bytesToHex(hashBytes); // convert hash to hex string

                // Compare the generated hash with the provided hashedPassword
                if (generatedHash.equals(hashedPassword)) {
                    return line; // Return the cracked password
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Password not found"; // Return if not found
    }

    // Utility method to convert byte array to hex string
    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public String encryptText(String plainText,String algo) throws NoSuchAlgorithmException {
        try {
            MessageDigest md = MessageDigest.getInstance(algo);
            byte[] hashedBytes = md.digest(plainText.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while encrypting";
        }
    }
}
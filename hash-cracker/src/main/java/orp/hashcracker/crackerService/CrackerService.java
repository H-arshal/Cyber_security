package orp.hashcracker.crackerService;


import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.MessageDigest;

@Service
public class CrackerService {

    public String crackPassword(String hashedPassword, String algorithm) {
        try {
            // Read wordlist.txt from resources folder
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(getClass().getResourceAsStream("/wordlist.txt")));

            String line;
            while ((line = reader.readLine()) != null) {
                String hashedLine = hash(line, algorithm);
                if (hashedLine.equalsIgnoreCase(hashedPassword)) {
                    return line;
                }
            }
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Password not found in wordlist!";
    }

    private String hash(String input, String algorithm) throws Exception {
        MessageDigest md = MessageDigest.getInstance(algorithm);
        byte[] hashedBytes = md.digest(input.getBytes());

        StringBuilder sb = new StringBuilder();
        for (byte b : hashedBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

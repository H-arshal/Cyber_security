package orp.img_encry_decry.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import orp.img_encry_decry.service.ImageEncryptionService;

import java.util.Base64;
import java.util.Map;

@RestController
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageEncryptionService service;

    @PostMapping("/encrypt-image")
    public ResponseEntity<?> encryptImage(@RequestParam("file") MultipartFile file) {
        try {
            byte[] imageBytes = file.getBytes();
            Map<String, Object> result = service.encryptImage(imageBytes);

            return ResponseEntity.ok(Map.of(
                    "encryptedData", Base64.getEncoder().encodeToString((byte[]) result.get("encryptedData")),
                    "key", result.get("key"),
                    "iv", result.get("iv")
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Encryption failed: " + e.getMessage());
        }
    }

    @PostMapping("/decrypt-image")
    public ResponseEntity<?> decryptImage(@RequestParam("file") MultipartFile file,
                                          @RequestParam("key") String key,
                                          @RequestParam("iv") String iv) {
        try {
            byte[] encryptedBytes = file.getBytes();
            byte[] decrypted = service.decryptImage(encryptedBytes, key, iv);
            String base64Image = Base64.getEncoder().encodeToString(decrypted);

            return ResponseEntity.ok(Map.of("decryptedImage", base64Image));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Decryption failed: " + e.getMessage());
        }
    }
}

package orp.img_encry_decry.service;

import org.springframework.stereotype.Service;
import orp.img_encry_decry.util.AESUtil;

import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImageEncryptionService {

    public Map<String, Object> encryptImage(byte[] imageBytes) throws Exception {
        SecretKey key = AESUtil.generateAESKey();
        IvParameterSpec iv = AESUtil.generateIV();

        byte[] encrypted = AESUtil.encrypt(imageBytes, key, iv);

        Map<String, Object> result = new HashMap<>();
        result.put("encryptedData", encrypted);
        result.put("key", AESUtil.encodeKey(key));
        result.put("iv", Base64.getEncoder().encodeToString(iv.getIV()));
        return result;
    }

    public byte[] decryptImage(byte[] encryptedData, String base64Key, String base64IV) throws Exception {
        SecretKey key = AESUtil.decodeKey(base64Key);
        IvParameterSpec iv = new IvParameterSpec(Base64.getDecoder().decode(base64IV));
        return AESUtil.decrypt(encryptedData, key, iv);
    }
}

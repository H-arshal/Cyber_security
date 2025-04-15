package orp.hashcracker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orp.hashcracker.crackerService.CrackerService;
import orp.hashcracker.model.CrackRequest;
import orp.hashcracker.model.CrackResponse;
import orp.hashcracker.model.EncryptRequest;
import orp.hashcracker.model.EncryptResponse;

import java.security.NoSuchAlgorithmException;

@RestController
public class CrackerController {

    private final CrackerService crackerService;

    @Autowired
    public CrackerController(CrackerService crackerService) {
        this.crackerService = crackerService;
    }

    @PostMapping(value = "/decrypt")
    public ResponseEntity<CrackResponse> getCrack(@RequestBody CrackRequest cr){
        System.out.println("Received Request: " + cr);
        String crackedPassword = crackerService.crackPassword(cr.getEncryptedText(), cr.getAlgo());
        CrackResponse response = new CrackResponse(crackedPassword, "success");
        System.out.println("Okay Response");
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/encrypt")
    public ResponseEntity<EncryptResponse> getEncrypt(@RequestBody EncryptRequest er) throws NoSuchAlgorithmException {
        System.out.println("In Encrypt");
        String plainText = crackerService.encryptText(er.getPlainText(),er.getAlgo());
        EncryptResponse response = new EncryptResponse(plainText,"Success");
        System.out.println("Completed Encryption");

        return ResponseEntity.ok(response);
    }
}
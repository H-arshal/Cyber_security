package orp.hashcracker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orp.hashcracker.crackerService.CrackerService;
import orp.hashcracker.model.CrackRequest;
import orp.hashcracker.model.CrackResponse;

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
        return ResponseEntity.ok(response);
    }
}
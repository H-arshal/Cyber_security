package orp.hashcracker.model;


public class CrackResponse {
    private String decryptedText;
    private String status;

    public CrackResponse() {
        // No-arg constructor
    }

    public CrackResponse(String decryptedText, String status) {
        this.decryptedText = decryptedText;
        this.status = status;
    }

    public String getDecryptedText() {
        return decryptedText;
    }

    public void setDecryptedText(String decryptedText) {
        this.decryptedText = decryptedText;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CrackResponse{" +
                "decryptedText='" + decryptedText + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

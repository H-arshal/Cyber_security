package orp.hashcracker.model;

public class EncryptResponse {
    public EncryptResponse(String encryptedText, String status) {
        this.encryptedText = encryptedText;
        this.status = status;
    }

    @Override
    public String toString() {
        return "EncryptResponse{" +
                "encryptedText='" + encryptedText + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    public String getEncryptedText() {
        return encryptedText;
    }

    public void setEncryptedText(String encryptedText) {
        this.encryptedText = encryptedText;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String encryptedText;
    private String status;
}

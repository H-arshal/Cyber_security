package orp.hashcracker.model;
public class CrackRequest {
    private String encryptedText;
    private String algo;

    public CrackRequest() {
        // No-arg constructor for deserialization
    }

    public CrackRequest(String encryptedText, String algo) {
        this.encryptedText = encryptedText;
        this.algo = algo;
    }

    public String getEncryptedText() {
        return encryptedText;
    }

    public void setEncryptedText(String encryptedText) {
        this.encryptedText = encryptedText;
    }

    public String getAlgo() {
        return algo;
    }

    public void setAlgo(String algo) {
        this.algo = algo;
    }

    @Override
    public String toString() {
        return "CrackRequest{" +
                "encryptedText='" + encryptedText + '\'' +
                ", algo='" + algo + '\'' +
                '}';
    }
}

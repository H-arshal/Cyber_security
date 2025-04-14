package orp.hashcracker.model;

public class EncryptRequest {
    private String plainText;
    private String algo;

    public EncryptRequest(String plainText, String algo) {
        this.plainText = plainText;
        this.algo = algo;
    }

    @Override
    public String toString() {
        return "EncryptRequest{" +
                "plainText='" + plainText + '\'' +
                ", algo='" + algo + '\'' +
                '}';
    }

    public String getPlainText() {
        return plainText;
    }

    public void setPlainText(String plainText) {
        this.plainText = plainText;
    }

    public String getAlgo() {
        return algo;
    }

    public void setAlgo(String algo) {
        this.algo = algo;
    }


}

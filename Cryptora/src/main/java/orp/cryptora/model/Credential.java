package orp.cryptora.service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Credential {
    @Id @GeneratedValue
    private int id;
    private String encryptedPassword;

    private String siteName;
    private String username;

    public Credential(int id, String encryptedPassword, String siteName, String username) {
        this.id = id;
        this.encryptedPassword = encryptedPassword;
        this.siteName = siteName;
        this.username = username;
    }

    public Credential() {

    }

    public int getId() {
        return id;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public String getSiteName() {
        return siteName;
    }

    public String getUsername() {
        return username;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Credential{" +
                "id=" + id +
                ", encryptedPassword='" + encryptedPassword + '\'' +
                ", siteName='" + siteName + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}

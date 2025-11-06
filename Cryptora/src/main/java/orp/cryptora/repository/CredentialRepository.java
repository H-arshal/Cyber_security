package orp.cryptora.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import orp.cryptora.model.Credential;

public interface Repository extends JpaRepository<Credential,Integer> {
    public default String getCredentialByUsername(){
        return
    }
}

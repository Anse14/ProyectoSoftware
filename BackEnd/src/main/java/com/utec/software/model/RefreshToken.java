package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class RefreshToken extends PanacheEntityBase {
    @Id
    public String id;
    public String token;

    public RefreshToken(String id, String token) {
        this.id = id;
        this.token = token;
    }

    public RefreshToken() {}
}

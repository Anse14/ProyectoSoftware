package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Optional;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {
    public String nombre;
    public String email;
    public String password;

    @ManyToOne
    public Rol rol;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {}

    public static Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }
}

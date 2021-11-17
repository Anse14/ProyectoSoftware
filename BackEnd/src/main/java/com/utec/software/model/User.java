package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Optional;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true)
public class User extends PanacheEntity {
    private String nombre;
    private String email;
    private String password;

    @ManyToOne(targetEntity = Carrera.class)
    private Carrera carrera;

    @ManyToOne(targetEntity = Rol.class)
    private Rol rol;

    @ManyToOne(targetEntity = Seccion.class)
    private Seccion seccion;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {}

    public static Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }
}

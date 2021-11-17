package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Optional;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true)
public class User extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String codigo;
    private String nombre;
    private String email;

    @ManyToOne(targetEntity = Carrera.class)
    private Carrera carrera;

    @ManyToOne(targetEntity = Rol.class)
    private Rol rol;

    @ManyToOne(targetEntity = Seccion.class)
    private Seccion seccion;

    public User(String email, String password) {
        this.email = email;
        this.codigo = password;
    }

    public User() {}

    public User(String codigo, String nombre, String email, Rol rol) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }

    public static Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }
}

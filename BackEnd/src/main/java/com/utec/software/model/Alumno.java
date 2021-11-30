package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "alumno")
@Data
public class Alumno extends  PanacheEntityBase{
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "codigo", unique = true)
    private String codigo;
    private String nombre;

    @Column(name = "correo", unique = true)
    private String correo; // Username

    @OneToMany(mappedBy = "alumno",fetch = FetchType.EAGER)
    private List<RubricaUsuario> rubricas;

    public Alumno(){}

    public Alumno(String codigo, String nombre, String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
    }

    public Alumno(String correo) {
        this.correo = correo;
    }

    public static Optional<Alumno> findByEmail(String email) {
        return find("correo", email).firstResultOptional();
    }


}

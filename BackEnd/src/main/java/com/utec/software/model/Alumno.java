package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
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

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "alumno")
    private List<RubricaUsuario> rubricas;

    public Alumno() {}

    public Alumno(String codigo, String nombre, String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
    }

    public Alumno(String correo) {
        this.correo = correo;
    }

    public void updateAttributes(Alumno alumno){
        this.nombre = alumno.nombre == null ? this.nombre : alumno.nombre;
        this.codigo = alumno.codigo == null ? this.codigo : alumno.codigo;
        this.correo = alumno.correo == null ? this.correo : alumno.correo;
    }

    public static Optional<Alumno> findByEmail(String email) {
        return find("correo", email).firstResultOptional();
    }
}

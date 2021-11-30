package com.utec.software.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Profesor extends PanacheEntityBase {
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

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Seccion> secciones;

    public Profesor(){
        secciones = new ArrayList<>();
    }

    public Profesor(String codigo, String nombre, String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
    }

    public void updateAttributes(Profesor profesor){
        this.nombre = profesor.nombre == null ? this.nombre : profesor.nombre;
        this.codigo = profesor.codigo == null ? this.codigo : profesor.codigo;
        this.correo = profesor.correo == null ? this.correo : profesor.correo;
    }

    @JsonProperty
    public UUID getId() {
        return id;
    }

    @JsonIgnore
    public void setId(UUID id) {
        this.id = id;
    }

    public static Optional<Profesor> findByEmail(String email) {
        return find("correo", email).firstResultOptional();
    }
}

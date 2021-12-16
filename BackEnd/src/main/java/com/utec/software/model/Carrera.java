package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Carrera extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "nombre", unique = true)
    private String nombre;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToMany(targetEntity = Curso.class)
    private List<Curso> cursos;

    public Carrera() {}

    public Carrera(String nombre) {
        this.nombre = nombre;
    }

    public void updateAttributes(Carrera carrera){
        this.nombre = carrera.nombre == null ? this.nombre : carrera.nombre;
    }
}

package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Curso extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private String codigo;
    private String nombre;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToMany(targetEntity = Carrera.class)
    private List<Carrera> carreras;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "curso")
    private List<Seccion> secciones;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "curso")
    private List<Rubrica> rubricas;

    public Curso() {}

    public Curso(String codigo, String nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
    public static Optional<Curso> findByCodigo(String codigo) {
        return find("codigo", codigo).firstResultOptional();
    }

    public void updateAttributes(Curso curso){
        this.nombre = curso.nombre == null ? this.nombre : curso.nombre;
        this.codigo = curso.codigo == null ? this.codigo : curso.codigo;
    }
}

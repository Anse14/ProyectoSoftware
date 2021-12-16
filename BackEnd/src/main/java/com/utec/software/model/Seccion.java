package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Seccion extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String codigo;
    private String semestre;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Curso.class)
    private Curso curso;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToMany
    private List<Profesor> profesores;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToOne(targetEntity = RubricaUsuario.class)
    private RubricaUsuario rubricaUsuario;

    public Seccion() {}

    public Seccion(String codigo, String semestre) {
        this.codigo = codigo;
        this.semestre = semestre;
    }

//    public static Optional<Seccion> findByCodigo(String codigo) { return find("codigo", codigo).firstResultOptional();}

    public void updateAttributes(Seccion seccion){
        this.semestre = seccion.semestre == null ? this.semestre : seccion.semestre;
        this.codigo = seccion.codigo == null ? this.codigo : seccion.codigo;
    }

    @Override
    public String toString() {
        return "Seccion [id=" + id + ", code=" + codigo + "]";
    }
}

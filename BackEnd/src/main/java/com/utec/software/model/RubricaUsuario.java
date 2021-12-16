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
public class RubricaUsuario extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private float evaluacionTotal;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Rubrica.class)
    private Rubrica rubrica ;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Alumno.class)
    private Alumno alumno;

    // error
    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToOne(targetEntity = Seccion.class)
    private Seccion seccion;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "rubricaUsuario")
    private List<DimensionUsuario> dimensionUsuarios;

    public RubricaUsuario() {}
}

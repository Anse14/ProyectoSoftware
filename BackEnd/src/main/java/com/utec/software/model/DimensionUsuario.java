package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class DimensionUsuario extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private String descripcion;
    private Float nota;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Dimension.class)
    private Dimension dimension;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToOne(targetEntity = Calificacion.class)
    private Calificacion calificacion;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = RubricaUsuario.class)
    private RubricaUsuario rubricaUsuario;

    public DimensionUsuario() {}
}

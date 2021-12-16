package com.utec.software.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Dimension extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    // Id de Rubrica

    private String descripcion;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Rubrica.class, optional = false)
    @JoinColumn(name = "rubrica_id")
    private Rubrica rubrica;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "dimension")
    private List<Calificacion> calificaciones;


    public Dimension() {}
    public void updateAttributes(Dimension dimension){
        this.descripcion = dimension.descripcion == null ? this.descripcion : dimension.descripcion;
    }
    public void changeAttributes(Dimension dimension, boolean option){
        if (option){
            this.descripcion = dimension.descripcion == null ? this.descripcion : dimension.descripcion;
        }
        else{
            this.calificaciones = dimension.calificaciones == null ? this.calificaciones : dimension.calificaciones;
        }

    }
}

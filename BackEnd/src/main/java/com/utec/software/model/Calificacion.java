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
public class Calificacion extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private String descripcion;
    private String titulo;
    private int nota;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Dimension.class)
    private Dimension dimension;

    public Calificacion() {}

    public void update(int nota_, String descripcion_, boolean bool){
        if (!bool){
            this.nota = nota_;
        }
        else {
            this.descripcion = descripcion_;
        }
    }

    public void updateAttributes(Calificacion calificacion){
        this.titulo = calificacion.titulo == null ? this.titulo : calificacion.titulo;
    }
}

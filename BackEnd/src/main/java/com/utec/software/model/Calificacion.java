package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

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
    private String titulo;
    private Integer nota;

    // Esta bien?
    @ManyToOne(targetEntity = Dimension.class)
    private Dimension dimension;

    public Calificacion(){}

    public void updateAttributes(Calificacion calificacion){
        this.titulo = calificacion.titulo == null ? this.titulo : calificacion.titulo;

    }
}

package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
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

    @ManyToOne
    private Rubrica rubrica;

    @OneToMany(mappedBy = "dimension",fetch = FetchType.LAZY)
    private List<Calificacion> calficaciones;


    public Dimension(){}

    public void updateAttributes(Dimension dimension){
        this.descripcion = dimension.descripcion == null ? this.descripcion : dimension.descripcion;

    }
}

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
public class DimensionUsuario extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private String username; // Correo del alumno?
    private String descripcion;

    @OneToOne(fetch = FetchType.EAGER)
    private Calificacion calificacion;

    @ManyToOne(targetEntity = RubricaUsuario.class)
    private RubricaUsuario rubricaUsuario;

    public DimensionUsuario(){}
}

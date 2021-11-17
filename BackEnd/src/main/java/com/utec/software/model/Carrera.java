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
public class Carrera extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private Integer codigoMalla;
    private String malla;
    private String nombre;

    @OneToMany(targetEntity = Competencia.class)
    private List<Competencia> competencias;

    @OneToMany(targetEntity = User.class)
    private List<User> alumnos;

    public Carrera(Integer codigoMalla, String malla, String nombre) {
        this.codigoMalla = codigoMalla;
        this.malla = malla;
        this.nombre = nombre;
    }

    public Carrera() {}
}

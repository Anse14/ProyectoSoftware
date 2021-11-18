package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Rubrica extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private Integer semana;
    private Integer dimensiones;
    private Integer nivel;
    private String descriptores;
    private Date fecha;
    private String actividad;
    private float criterio_de_desempenho;

    @ManyToOne(targetEntity = Curso.class)
    private Curso curso;

    @ManyToOne(targetEntity = Competencia.class)
    private Competencia competencia;
}

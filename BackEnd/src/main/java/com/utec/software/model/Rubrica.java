package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Rubrica extends PanacheEntity {
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

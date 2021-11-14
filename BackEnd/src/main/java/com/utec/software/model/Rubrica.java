package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class Rubrica extends PanacheEntity {
    public Integer semana;
    public Integer dimensiones;
    public Integer nivel;
    public String descriptores;
    public Date fecha;
    public String actividad;
    public float criterio_de_desempenho;

    @ManyToOne
    public Curso curso;
}

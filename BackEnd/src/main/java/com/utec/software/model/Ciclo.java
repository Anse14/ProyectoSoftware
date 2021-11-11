package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
public class Ciclo extends PanacheEntity {

    @ManyToOne
    public Carrera carrera;

    @ManyToMany(targetEntity = Curso.class)
    public List<Curso> cursos;

}

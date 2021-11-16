package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Curso extends PanacheEntity {
    private String codigo;
    private String titulo;
    private String ciclo;
    private String semestre;

    @OneToMany(targetEntity = Rubrica.class)
    private List<Rubrica> rubricas;

    @ManyToMany(targetEntity = Seccion.class)
    private List<Seccion> secciones;

    public Curso() {

    }
}

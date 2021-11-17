package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Competencia extends PanacheEntity {
    private String codigo;
    private String descripcion;

    @OneToMany(targetEntity = Rubrica.class)
    private List<Rubrica> rubricas;

    @ManyToOne(targetEntity = Carrera.class)
    private Carrera carrera;
}

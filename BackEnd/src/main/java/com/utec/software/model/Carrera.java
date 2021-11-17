package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Carrera extends PanacheEntity {
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

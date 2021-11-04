package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Resultado extends PanacheEntity {
    public String codigo;
    public String titulo;
    public String descripcion;

    @OneToMany(targetEntity = Criterio.class)
    List<Criterio> criterios;
}

package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Dimension extends PanacheEntity {
    public String cd;
    public String descripcion;

    @OneToMany(targetEntity = Criterio.class)
    public List<Criterio> criterios;
}

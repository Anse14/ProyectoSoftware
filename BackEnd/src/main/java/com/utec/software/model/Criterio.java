package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Criterio extends PanacheEntity {
    public String descripcion;
    public Integer valor;

    @OneToMany(targetEntity = Ciclo.class)
    List<Ciclo> ciclos;
}

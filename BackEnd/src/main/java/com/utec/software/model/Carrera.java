package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Carrera extends PanacheEntity {

    @OneToMany(targetEntity = Ciclo.class)
    public List<Ciclo> ciclos;
}

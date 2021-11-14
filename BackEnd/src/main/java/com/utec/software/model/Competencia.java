package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Competencia extends PanacheEntity {
    public String codigo;
    public String descripcion;
}

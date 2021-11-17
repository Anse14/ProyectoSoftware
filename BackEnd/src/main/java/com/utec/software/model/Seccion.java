package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Seccion extends PanacheEntity {
    private Integer codigo;

    @ManyToMany(targetEntity = Curso.class)
    private List<Curso> cursos;

    @OneToMany(targetEntity = User.class)
    private List<User> usuarios;
}

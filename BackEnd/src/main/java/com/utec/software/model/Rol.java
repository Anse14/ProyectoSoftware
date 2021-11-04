package com.utec.software.model;

import com.utec.software.model.enums.RolEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Rol extends PanacheEntity {
    public RolEnum tipo;

    @OneToMany(targetEntity = User.class)
    public List<User> usuarios;
}

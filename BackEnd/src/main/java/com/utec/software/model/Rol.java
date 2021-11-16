package com.utec.software.model;

import com.utec.software.model.enums.RolEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Rol extends PanacheEntity {
    private RolEnum tipo;

    @OneToMany(targetEntity = User.class)
    private List<User> usuarios;
}

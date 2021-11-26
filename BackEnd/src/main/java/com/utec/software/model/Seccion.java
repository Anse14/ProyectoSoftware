package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Seccion extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String codigo;

    @ManyToMany(targetEntity = Curso.class)
    private List<Curso> cursos;

    @OneToMany(targetEntity = User.class)
    private List<User> usuarios;

    public Seccion() {}

    public Seccion(String codigo) {
        this.codigo = codigo;
    }
    public static Optional<Seccion> findByCodigo(String codigo) { return find("codigo", codigo).firstResultOptional();}
}

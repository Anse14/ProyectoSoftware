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
public class Curso extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    private String codigo;
    private String nombre;

    @ManyToOne
    private Carrera carrera;

    @OneToMany(mappedBy = "curso",fetch = FetchType.LAZY)
    private List<Seccion> secciones;
    @OneToMany()
    private List<Rubrica> rubricas;

    public Curso() {}

    public Curso(String codigo, String nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
    public static Optional<Curso> findByCodigo(String codigo) {
        return find("codigo", codigo).firstResultOptional();
    }

    public void updateAttributes(Curso curso){
        this.nombre = curso.nombre == null ? this.nombre : curso.nombre;
        this.codigo = curso.codigo == null ? this.codigo : curso.codigo;
    }
}

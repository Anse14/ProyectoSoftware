package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
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
    private String titulo;
    private String ciclo;
    private String semestre;

    @OneToMany(targetEntity = Rubrica.class)
    private List<Rubrica> rubricas;

    @ManyToMany(targetEntity = Seccion.class)
    private List<Seccion> secciones;

    public Curso() {}

    public Curso(String codigo, String periodo, String titulo) {
        this.codigo = codigo;
        this.semestre = periodo;
        this.titulo = titulo;
    }
}

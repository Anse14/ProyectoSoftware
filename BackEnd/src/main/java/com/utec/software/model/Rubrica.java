package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Rubrica extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String codigo;
    private Integer nivel;
    private String actividadBase;
    private String evidencia;
    private String criterioDeDesempenho;
    private String tipo;
    private String semana;
    
    private String ciclo;
    private String semestre;
    private String fecha;
    private String numCritDesemp;
    
    private Boolean status;  // null = en modificacion  false = calidadEducativa debe revisarlo true = revisado

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToOne
    private Profesor lastUpdateProfesor;

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "rubrica")
    private List<Dimension> dimensiones;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = Curso.class)
    private Curso curso;

    @LazyCollection(LazyCollectionOption.TRUE)
    @ManyToOne(targetEntity = CalidadEducativa.class)
    private CalidadEducativa calidadEducativa;

    public Rubrica() {}

    public void insertDimension(Dimension dimension){
        this.dimensiones.add(dimension);
        //no status because it has to also link a CalidadEducativa object
    }

    public void updateAttributes(Rubrica rubrica){
        this.dimensiones = rubrica.dimensiones;
        //no status because it has to also link a CalidadEducativa object
    }
}

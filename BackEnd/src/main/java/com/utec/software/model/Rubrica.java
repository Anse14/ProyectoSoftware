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

    @OneToMany(mappedBy = "rubrica",fetch = FetchType.LAZY)
    private List<Dimension> dimensiones;

    @ManyToOne(targetEntity = Curso.class)
    private Curso curso;

    @ManyToOne(targetEntity = CalidadEducativa.class)
    private CalidadEducativa calidadEducativa;

    public Rubrica(){}

    public void updateAttributes(Rubrica rubrica){
        this.nivel = rubrica.nivel == null ? this.nivel : rubrica.nivel;
        this.codigo = rubrica.codigo == null ? this.codigo : rubrica.codigo;
        this.actividadBase = rubrica.actividadBase == null ? this.actividadBase : rubrica.actividadBase;
        this.evidencia = rubrica.evidencia == null ? this.evidencia : rubrica.evidencia;
        this.criterioDeDesempenho = rubrica.criterioDeDesempenho == null ? this.criterioDeDesempenho : rubrica.criterioDeDesempenho;
        this.tipo = rubrica.tipo == null ? this.tipo : rubrica.tipo;
        this.semana = rubrica.semana == null ? this.semana : rubrica.semana;
        
        this.ciclo = rubrica.ciclo == null ? this.ciclo: rubrica.ciclo;
        this.semestre = rubrica.semestre == null ? this.semestre: rubrica.semestre;
        this.fecha = rubrica.fecha == null ? this.fecha: rubrica.fecha;
        this.numCritDesemp = rubrica.numCritDesemp== null ? this.numCritDesemp: rubrica.numCritDesemp;
        
        //no status because it has to also link a CalidadEducativa object
    }
}

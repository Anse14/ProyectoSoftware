package com.utec.software.model;

import com.utec.software.model.enums.InstrumentoCurso;
import com.utec.software.model.enums.TipoDeCurso;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Curso extends PanacheEntity {
    public String codigo;
    public String titulo;
    public Integer semana;
    public String actividad;
    public Integer nivel;
    public TipoDeCurso tipo;
    public String evidencia;
    public InstrumentoCurso instrumento;

    @OneToMany(targetEntity = Rubrica.class)
    public List<Rubrica> rubricas;

    public Curso() {

    }
}

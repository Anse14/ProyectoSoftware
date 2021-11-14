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
    public String ciclo;
    public String semestre;

    @OneToMany(targetEntity = Rubrica.class)
    public List<Rubrica> rubricas;

    public Curso() {

    }
}

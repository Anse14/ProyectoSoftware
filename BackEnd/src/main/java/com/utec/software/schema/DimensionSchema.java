package com.utec.software.schema;

import com.utec.software.model.Calificacion;
import lombok.Data;

import java.util.List;

@Data
public class DimensionSchema {
    private String descripcion;
    private List<Calificacion> calficaciones;
}

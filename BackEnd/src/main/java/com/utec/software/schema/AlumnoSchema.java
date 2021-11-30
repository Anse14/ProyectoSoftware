package com.utec.software.schema;

public class AlumnoSchema {
    public AlumnoSchema() {}

    public String codigo;
    public String nombre;
    public String correo;

    public AlumnoSchema(String codigo, String nombre,String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
    }
}

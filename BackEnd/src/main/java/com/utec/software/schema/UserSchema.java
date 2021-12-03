package com.utec.software.schema;

import com.utec.software.schema.enums.RolEnum;
import lombok.Data;

@Data
public class UserSchema {
    private String codigo;
    private String nombre;
    private String correo;
    private RolEnum tipo;

    public UserSchema() {}

    public UserSchema(String codigo, String nombre, String correo, RolEnum tipo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
        this.tipo = tipo;
    }
}

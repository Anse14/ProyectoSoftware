package com.utec.software.schema;

import com.utec.software.schema.enums.RolEnum;
import lombok.Data;

import java.util.UUID;

@Data
public class UserSchema {
    private UUID id;
    private String codigo;
    private String nombre;
    private String correo;
    private RolEnum tipo;

    public UserSchema() {}

    public UserSchema(UUID id, String codigo, String nombre, String correo, RolEnum tipo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
        this.tipo = tipo;
    }
}

package com.utec.software.schema;

import com.utec.software.model.enums.RolEnum;

public class UserSchema {
    public UserSchema() {}

    public String email;
    public String name;
    public RolEnum rol;
    public Integer status;

    public UserSchema(String email, String name, RolEnum rol) {
        this.email = email;
        this.name = name;
        this.rol = rol;
        this.status = 0;
    }

    public UserSchema(Integer status) {
        this.status = status;
    }
}

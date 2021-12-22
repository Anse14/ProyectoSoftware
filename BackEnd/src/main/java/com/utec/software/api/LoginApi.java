package com.utec.software.api;

import lombok.Data;

@Data
public class LoginApi {
    private String email;
    private String password;

    private Integer status;

    private String token;
    private String refresh;

    public LoginApi(String email, Integer status, String token, String refresh) {
        this.email = email;
        this.password = "";
        this.status = status;
        this.token = token;
        this.refresh = refresh;
    }

    public LoginApi() {}
}

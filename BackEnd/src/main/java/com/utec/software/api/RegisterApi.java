package com.utec.software.api;

public class RegisterApi {
    public String email;
    public String password;
    public Integer status;
    public String token;
    public String refresh;

    public RegisterApi(String email, String password, Integer status, String token, String refresh) {
        this.email = email;
        this.password = password;
        this.status = status;
        this.token = token;
        this.refresh = refresh;
    }

    public RegisterApi() {}
}

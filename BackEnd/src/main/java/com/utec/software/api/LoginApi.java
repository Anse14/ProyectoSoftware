package com.utec.software.api;

public class LoginApi {
    public String email;
    public String password;

    public Integer status;
    public String token;
    public String refresh;

    public LoginApi(String email, Integer status, String token, String refresh) {
        this.email = email;
        this.password = "";
        this.status = status;
        this.token = token;
        this.refresh = refresh;
    }

    public LoginApi() {}
}

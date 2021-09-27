package com.utec.software.api;

public class RefreshApi {
    public String email;
    public String refresh;
    public String token;
    public Integer status;

    public RefreshApi(String email, String token, Integer status) {
        this.email = email;
        this.refresh = "";
        this.token = token;
        this.status = status;
    }

    public RefreshApi() {}
}

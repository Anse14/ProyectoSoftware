package com.utec.software.api;

public class GLoginApi {
    public String email;

    public Integer status;
    public String token;
    public String refresh;


    public GLoginApi(String email, Integer status, String token, String refresh) {
        this.email = email;
        this.status = status;
        this.token = token;
        this.refresh = refresh;
    }

    public GLoginApi() {}
}

package com.utec.software.api;

import lombok.Data;

@Data
public class GLoginApi {
    private String email;

    private Integer status;
    private String token;
    private String refresh;


    public GLoginApi(String email, Integer status, String token, String refresh) {
        this.email = email;
        this.status = status;
        this.token = token;
        this.refresh = refresh;
    }

    public GLoginApi() {}
}

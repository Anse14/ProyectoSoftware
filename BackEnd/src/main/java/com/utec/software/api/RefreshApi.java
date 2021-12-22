package com.utec.software.api;

import lombok.Data;

@Data
public class RefreshApi {
    private String email;
    private String refresh;
    private String token;
    private Integer status;

    public RefreshApi(String email, String token, Integer status) {
        this.email = email;
        this.refresh = "";
        this.token = token;
        this.status = status;
    }

    public RefreshApi() {}
}

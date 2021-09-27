package com.utec.software.controllers;

import com.utec.software.api.LoginApi;
import com.utec.software.api.LogoutApi;
import com.utec.software.api.RefreshApi;
import com.utec.software.api.RegisterApi;
import com.utec.software.model.RefreshToken;
import com.utec.software.model.User;
import com.utec.software.services.AuthService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.Optional;

@Path("/auth")
public class AuthController {
    @Inject
    AuthService authService;

    @POST
    @Path("/register")
    @Transactional
    public RegisterApi register(RegisterApi req) {
        if(User.findByEmail(req.email).isPresent()) {
            return new RegisterApi(req.email, "", 1, "", "");
        }
        (new User(req.email, req.password)).persist();

        final String token = authService.genAccessToken(req.email);
        final String refresh = authService.genRefreshToken();

        (new RefreshToken(req.email, refresh)).persist();
        return new RegisterApi(req.email, "", 0, token, refresh);
    }

    @POST
    @Path("/login")
    @Transactional
    public LoginApi login(LoginApi req) {
        var usr = User.findByEmail(req.email);
        if(usr.isEmpty()) {
            return new LoginApi("", 1, "", "");
        }

        if(!usr.get().password.equals(req.password)) {
            return new LoginApi(req.email, 2, "", "");
        }

        final String token = authService.genAccessToken(req.email);
        final String refresh = authService.genRefreshToken();

        (new RefreshToken(req.email, refresh)).persist();

        return new LoginApi(req.email, 0, token, refresh);
    }

    @POST
    @Path("/refresh")
    @Transactional
    public RefreshApi refresh(RefreshApi req) {
        Optional<RefreshToken> refresh = RefreshToken.findByIdOptional(req.email);
        if(refresh.isEmpty()) {
            return new RefreshApi("", "", 1);
        }
        if(!refresh.get().token.equals(req.refresh)) {
            return new RefreshApi(req.email, "", 2);
        }

        final String token = authService.genAccessToken(req.email);

        return new RefreshApi(req.email, token, 0);
    }

    @POST
    @Path("/logout")
    @Transactional
    public Boolean logout(LogoutApi req) {
        Optional<RefreshToken> refresh = RefreshToken.findByIdOptional(req.email);
        if(refresh.isPresent()) {
            refresh.get().delete();
            return true;
        }
        return false;
    }
}
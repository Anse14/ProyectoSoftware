package com.utec.software.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.utec.software.api.*;
import com.utec.software.model.RefreshToken;
import com.utec.software.services.AuthService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Optional;

@Path("/auth")
public class AuthController {
    @Inject
    AuthService authService;

    @POST
    @Path("/refresh")
    @Transactional
    public RefreshApi refresh(RefreshApi req) {
        Optional<RefreshToken> refresh = RefreshToken.findByIdOptional(req.getEmail());
        if(refresh.isEmpty()) {
            return new RefreshApi("", "", 1);
        }
        if(!refresh.get().getToken().equals(req.getRefresh())) {
            return new RefreshApi(req.getEmail(), "", 2);
        }

        final String token = authService.genAccessToken(req.getEmail());

        return new RefreshApi(req.getEmail(), token, 0);
    }

    @POST
    @Path("/google-login")
    @Transactional
    public GLoginApi glogin(GLoginApi usr) throws GeneralSecurityException, IOException {
        if(usr.getToken().equals("")) {
            return new GLoginApi("", 1, "", "");
        }
        GoogleIdToken idToken = null;
        try {
            idToken = authService.verifyGtoken(usr.getToken());
        } catch(IllegalArgumentException err) {
            return new GLoginApi("", 3, "", "");
        }

        return authService.loginWithGoogle(idToken);
    }
}

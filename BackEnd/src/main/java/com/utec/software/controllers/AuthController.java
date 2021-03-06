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
        Optional<RefreshToken> refresh = RefreshToken.findByIdOptional(req.email);
        if(refresh.isEmpty()) {
            return new RefreshApi("", "", 1);
        }
        if(!refresh.get().getToken().equals(req.refresh)) {
            return new RefreshApi(req.email, "", 2);
        }

        final String token = authService.genAccessToken(req.email);

        return new RefreshApi(req.email, token, 0);
    }

    @POST
    @Path("/google-login")
    @Transactional
    public GLoginApi glogin(GLoginApi usr) throws GeneralSecurityException, IOException {
        if(usr.token.equals("")) {
            return new GLoginApi("", 1, "", "");
        }
        GoogleIdToken idToken = null;
        try {
            idToken = authService.verifyGtoken(usr.token);
        } catch(IllegalArgumentException err) {
            return new GLoginApi("", 3, "", "");
        }

        return authService.loginWithGoogle(idToken);
    }
}

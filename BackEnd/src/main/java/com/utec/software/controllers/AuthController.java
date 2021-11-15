package com.utec.software.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.utec.software.api.*;
import com.utec.software.model.RefreshToken;
import com.utec.software.model.User;
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

//    @POST
//    @Path("/register")
//    @Transactional
//    public RegisterApi register(RegisterApi req) {
//        if(User.findByEmail(req.email).isPresent()) {
//            return new RegisterApi(req.email, "", 1, "", "");
//        }
//        (new User(req.email, req.password)).persist();
//
//        final String token = authService.genAccessToken(req.email);
//        final String refresh = authService.genRefreshToken();
//
//        (new RefreshToken(req.email, refresh)).persist();
//        return new RegisterApi(req.email, "", 0, token, refresh);
//    }
//
//    @POST
//    @Path("/login")
//    @Transactional
//    public LoginApi login(LoginApi req) {
//        var usr = User.findByEmail(req.email);
//        if(usr.isEmpty()) {
//            return new LoginApi("", 1, "", "");
//        }
//
//        if(!usr.get().password.equals(req.password)) {
//            return new LoginApi(req.email, 2, "", "");
//        }
//
//        final String token = authService.genAccessToken(req.email);
//        final String refresh = authService.genRefreshToken();
//
//        (new RefreshToken(req.email, refresh)).persist();
//
//        return new LoginApi(req.email, 0, token, refresh);
//    }

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
        
        if(idToken != null) {
            var payload = idToken.getPayload();
            usr.email = payload.getEmail();
            var user = User.findByEmail(usr.email);

            if(user.isEmpty()) {
                (new User(usr.email, "")).persist();
            }

            final String token = authService.genAccessToken(usr.email);
            final String refresh = authService.genRefreshToken();

            usr.token = token;
            usr.refresh = refresh;
            usr.status = 0;

            Optional<RefreshToken> refr = RefreshToken.findByIdOptional(usr.email);
            refr.ifPresent(RefreshToken::delete);

            (new RefreshToken(usr.email, refresh)).persist();

            return usr;
        }

        return new GLoginApi("", 2, "", "");
    }
}

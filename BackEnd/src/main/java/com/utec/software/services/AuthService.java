package com.utec.software.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.utec.software.api.GLoginApi;
import com.utec.software.model.Alumno;
import com.utec.software.model.CalidadEducativa;
import com.utec.software.model.Profesor;
import com.utec.software.model.RefreshToken;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@ApplicationScoped
public class AuthService {
    @ConfigProperty(name = "jwt.secret")
    String secret;

    @ConfigProperty(name = "googleClientId")
    String clientID;

    public String genAccessToken(String subject) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        var now = Instant.now();
        return JWT.create()
                .withSubject(subject)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(now.plus(24, ChronoUnit.HOURS)))
                .sign(algorithm);
    }

    public String genRefreshToken() {
        var rand = new SecureRandom();
        var refreshBytes = new byte[128];
        rand.nextBytes(refreshBytes);
        // Refresh
        return Base64.getUrlEncoder().withoutPadding().encodeToString(refreshBytes);
    }

    public GoogleIdToken verifyGtoken(String token) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientID))
                .build();
        return verifier.verify(token);
    }

    public void saveUser(String email) {
        var alumno = Alumno.findByEmail(email);
        if(alumno.isPresent()) {
            return;
        }

        var profesor = Profesor.findByEmail(email);
        if(profesor.isPresent()) {
            return;
        }

        var calidad = CalidadEducativa.findByEmail(email);
        if (calidad.isPresent()) {
            return;
        }

        (new Alumno(email)).persist();
    }

    public GLoginApi loginWithGoogle(GoogleIdToken token) {
        if(token == null) {
            return new GLoginApi("", 2, "", "");
        }
        var payload = token.getPayload();
        var email = payload.getEmail();

        saveUser(email);

        final String accessToken = genAccessToken(email);
        final String refreshToken = genRefreshToken();

        Optional<RefreshToken> refr = RefreshToken.findByIdOptional(email);
        refr.ifPresent(RefreshToken::delete);

        (new RefreshToken(email, refreshToken)).persist();

        return new GLoginApi(email, 0, accessToken, refreshToken);
    }
}

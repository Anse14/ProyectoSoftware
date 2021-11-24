package com.utec.software.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
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
                .withExpiresAt(Date.from(now.plus(1, ChronoUnit.MINUTES)))
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
}

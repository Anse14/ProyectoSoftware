package com.utec.software.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@ApplicationScoped
public class AuthService {
    @ConfigProperty(name = "jwt.secret")
    String secret;

    public String genAccessToken(String subject) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        var now = Instant.now();
        return JWT.create()
                .withSubject(subject)
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(now.plus(15, ChronoUnit.MINUTES)))
                .sign(algorithm);
    }

    public String genRefreshToken() {
        var rand = new SecureRandom();
        var refreshBytes = new byte[128];
        rand.nextBytes(refreshBytes);
        // Refresh
        return Base64.getUrlEncoder().withoutPadding().encodeToString(refreshBytes);
    }
}

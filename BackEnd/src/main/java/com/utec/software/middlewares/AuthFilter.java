package com.utec.software.middlewares;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import java.util.Objects;
import org.eclipse.microprofile.config.inject.ConfigProperty;

public class AuthFilter {
    @ConfigProperty(name = "jwt.secret")
    String secret;

    @ConfigProperty(name = "masterKey")
    String masterKey;

    @RouteFilter(100)
    void myFilter(RoutingContext rc) {
        if(rc.request().uri().contains("auth")) {
            rc.next();
            return;
        }

        String token = rc.request().headers().get("authorization");

        if(token == null) {
            // DEBUG CODE
            rc.request().headers().add("email", "jorge.gonzales@utec.edu.pe");
            rc.next();
            return;
            // END OF DEBUG CODE
             //rc.fail(405);
             //return;
        }

        if(Objects.equals(token, masterKey)) {
            rc.next();
            return;
        }

        String[] tokens = token.split(" ");

        if(tokens.length < 2) {
            rc.fail(405);
            return;
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(tokens[1]);
            rc.request().headers().add("email", jwt.getSubject());
        } catch (JWTVerificationException exception) {
            rc.fail(405);
            return;
        }
        rc.next();
    }
}

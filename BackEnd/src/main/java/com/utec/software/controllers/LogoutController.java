package com.utec.software.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.utec.software.model.*;
import com.utec.software.services.DBService;
import oracle.ucp.util.Pair;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.reactive.RestHeader;

import javax.inject.Inject;
import javax.json.Json;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.Subgraph;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.io.StringReader;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Path("")
public class LogoutController {
    @ConfigProperty(name = "jwt.secret")
    String secret;

    @GET
    @Path("/logout")
    @Transactional
    public Boolean logout(@RestHeader("authorization") String token) {
        if(token == null) {
            return false;
        }
        String[] tokens = token.split(" ");
        if(tokens.length < 2) {
            return false;
        }
        String email = "";
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(tokens[1]);
            email = jwt.getSubject();
        } catch (JWTVerificationException exception) {
            return false;
        }
        Optional<RefreshToken> refresh = RefreshToken.findByIdOptional(email);
        if(refresh.isPresent()) {
            refresh.get().delete();
            return true;
        }
        return false;
    }

//    @Inject
//    EntityManager em;
//
//    @Inject
//    DBService dbService;
//
//    @GET
//    @Path("/test")
//    @Transactional
//    public List<DimensionUsuario> test() {
//        return dbService.findByRelation(
//                em.createEntityGraph(DimensionUsuario.class),
//                DimensionUsuario.class,
//                new Pair<>("rubricaUsuario", UUID.fromString("8e662928-5d65-11ec-bf63-0242ac130002"))
//        );
//    }
}

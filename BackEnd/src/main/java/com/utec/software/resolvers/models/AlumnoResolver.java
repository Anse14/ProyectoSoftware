package com.utec.software.resolvers.models;

import com.utec.software.model.Alumno;
import com.utec.software.schema.AlumnoSchema;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;

@GraphQLApi
public class AlumnoResolver {
    @Inject
    CurrentVertxRequest request;

    @Query("getAlumno")
    @Description("Brings a alumno")
    @Transactional
    public Uni<AlumnoSchema> getUser() {
        String email = request.getCurrent().request().getHeader("email");
        var usr = Alumno.findByEmail(email);
        if(usr.isEmpty()) {
            return  Uni.createFrom().item(new AlumnoSchema());
        }
        Alumno u = usr.get();
        return Uni.createFrom().item(new AlumnoSchema(u.getCodigo(), u.getNombre(), u.getCorreo()));
    }

}
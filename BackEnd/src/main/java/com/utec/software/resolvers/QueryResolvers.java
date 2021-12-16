package com.utec.software.resolvers;

import com.utec.software.model.Alumno;
import com.utec.software.model.CalidadEducativa;
import com.utec.software.model.Profesor;
import com.utec.software.schema.UserSchema;
import com.utec.software.schema.enums.RolEnum;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;

@GraphQLApi
public class QueryResolvers {
    @Inject
    CurrentVertxRequest request;

    @Query("getUser")
    @Description("Brings a user")
    @Transactional
    public Uni<UserSchema> getUser() {
        var email = request.getCurrent().request().getHeader("email");

        var profesor = Profesor.findByEmail(email);
        if(profesor.isPresent()) {
            var elem = profesor.get();
            return Uni.createFrom().item(new UserSchema(elem.getId(), elem.getCodigo(), elem.getNombre(), elem.getCorreo(), RolEnum.PROFESOR));
        }

        var calidad = CalidadEducativa.findByEmail(email);
        if (calidad.isPresent()) {
            var elem = calidad.get();
            return Uni.createFrom().item(new UserSchema(elem.getId(), elem.getCodigo(), elem.getNombre(), elem.getCorreo(), RolEnum.CALIDAD));
        }

        var alumno = Alumno.findByEmail(email);
        if(alumno.isPresent()) {
            var elem = alumno.get();
            return Uni.createFrom().item(new UserSchema(elem.getId(), elem.getCodigo(), elem.getNombre(), elem.getCorreo(), RolEnum.ALUMNO));
        }

        return Uni.createFrom().item(null);
    }
}

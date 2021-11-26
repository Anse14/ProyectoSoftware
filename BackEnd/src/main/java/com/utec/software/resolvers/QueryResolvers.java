package com.utec.software.resolvers;

import com.utec.software.model.Curso;
import com.utec.software.model.Seccion;
import com.utec.software.model.User;
//import com.utec.software.schema.CursoSchema;
// import com.utec.software.schema.SeccionSchema;
 import com.utec.software.schema.UserSchema;
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
        String email = request.getCurrent().request().getHeader("email");
        var usr = User.findByEmail(email);
        if(usr.isEmpty()) {
            return  Uni.createFrom().item(new UserSchema(1));
        }
        var u = usr.get();
        return Uni.createFrom().item(new UserSchema(u.getEmail(), u.getNombre(), u.getRol().getTipo()));
    }

    // @Query("getCurso")
    // @Description("Brings a subject")
    // @Transactional
    // public Uni<CursoSchema> getCurso() {
    //     // Se debe traer los cursos asociados a un profesor.
    //     String codigo = request.getCurrent().request().getHeader("codigo");
    //     var curso = Curso.findByCodigo(codigo);
    //     if(curso.isEmpty()) {
    //         return  Uni.createFrom().item(new CursoSchema());
    //     }
    //     var c = curso.get();
    //     return Uni.createFrom().item(new CursoSchema(c.getCodigo(), c.getTitulo(), c.getCiclo(), c.getSemestre()));
    // }

    // @Query("getSeccion")
    // @Description("Brings a seccion")
    // @Transactional
    // public Uni<SeccionSchema> getSeccion() {
    //     String codigo = request.getCurrent().request().getHeader("codigo");
    //     var seccion = Seccion.findByCodigo(codigo);
    //     if(seccion.isEmpty()) {
    //         return  Uni.createFrom().item(new SeccionSchema());
    //     }
    //     var s = seccion.get();
    //     return Uni.createFrom().item(new SeccionSchema(s.getCodigo()));
    // }


}

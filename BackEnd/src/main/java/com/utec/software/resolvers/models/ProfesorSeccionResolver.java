package com.utec.software.resolvers.models;

import com.utec.software.model.Profesor;
import com.utec.software.model.Seccion;
import com.utec.software.schema.ProfesorSeccionSchema;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class ProfesorSeccionResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_profesor_seccion_one")
    @Description("Inserta un profesorSeccion")
    @Transactional
    public Profesor createProfesorSeccion(ProfesorSeccionSchema profesorSeccion) {
        try {
            Seccion seccion = Seccion.findById(UUID.fromString(profesorSeccion.getSeccionId()));
            Profesor profesor = Profesor.findById(UUID.fromString(profesorSeccion.getProfesorId()));
            if(seccion == null || profesor == null){
                return null;
            }
            seccion.getProfesores().add(profesor);
            profesor.getSecciones().add(seccion);
            profesor.persist();
            seccion.persist();
            return profesor;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Mutation("delete_profesor_seccion_one")
    @Description("Elimina una relacion profesor-seccion basandose en la llave primaria")
    @Transactional
    public Profesor updateProfesorSeccion(ProfesorSeccionSchema profesorSeccion) {
        try{
            Profesor actual = Profesor.findById(UUID.fromString(profesorSeccion.getProfesorId()));
            actual.getSecciones().removeIf(e -> e.getId() == UUID.fromString(profesorSeccion.getSeccionId()));
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

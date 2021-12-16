package com.utec.software.resolvers.models;

import com.utec.software.model.Profesor;
import com.utec.software.model.Seccion;
import com.utec.software.schema.ProfesorSeccionSchema;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import org.eclipse.microprofile.graphql.*;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class ProfesorSeccionResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_profesor_seccion_one")
    @Description("Inserta un profesorSeccion")
    @Transactional
    public Profesor createProfesorSeccion(@NonNull ProfesorSeccionSchema profesorSeccion) {
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
    public Profesor updateProfesorSeccion(@NonNull ProfesorSeccionSchema profesorSeccion) {
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

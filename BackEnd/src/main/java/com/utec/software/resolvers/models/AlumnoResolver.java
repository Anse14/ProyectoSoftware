package com.utec.software.resolvers.models;

import com.utec.software.model.Alumno;
import com.utec.software.model.Profesor;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import org.eclipse.microprofile.graphql.*;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class AlumnoResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_alumno_one")
    @Description("Inserta un alumno")
    @Transactional
    public Alumno createAlumno(@NonNull Alumno alumno) {
        try {
            alumno.persist();
            return alumno;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("alumno")
    @Description("Trae todos los alumnos")
    @Transactional
    public List<Alumno> getAlumnos() {
        var arr = context.getSelectedFields();
        EntityGraph<Alumno> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Alumno.class));

        return dbService.findAll(graph, Alumno.class);
    }

    @Query("alumno_by_pk")
    @Description("Trae un alumno basado en la llave primaria")
    @Transactional
    public Alumno getAlumno(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Alumno> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Alumno.class));

        return dbService.findById(graph, Alumno.class, id);
    }

    @Mutation("update_alumno_by_pk")
    @Description("Actualiza un alumno basandose en la llave primaria")
    @Transactional
    public Alumno updateAlumno(@NonNull Alumno alumno, @NonNull String id) {
        try {
            Alumno actual = Alumno.findById(UUID.fromString(id));
            actual.updateAttributes(alumno);
            actual.persist();
            return actual;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
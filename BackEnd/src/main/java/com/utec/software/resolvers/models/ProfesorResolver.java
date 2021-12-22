package com.utec.software.resolvers.models;

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
public class ProfesorResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_profesor_one")
    @Description("Inserta un profesor")
    @Transactional
    public Profesor createProfesor(@NonNull Profesor profesor) {
        try {
            profesor.persist();
            return profesor;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("profesor")
    @Description("Trae todos los profesores")
    @Transactional
    public List<Profesor> getProfesores() {
        var arr = context.getSelectedFields();
        EntityGraph<Profesor> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Profesor.class));

        return dbService.findAll(graph, Profesor.class);
    }

    @Query("profesor_by_pk")
    @Description("Trae un profesor basado en la llave primaria")
    @Transactional
    public Profesor getProfesor(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Profesor> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Profesor.class));

        return dbService.findById(graph, Profesor.class, id);
    }

    @Mutation("update_profesor_by_pk")
    @Description("Actualiza un profesor basandose en la llave primaria")
    @Transactional
    public Profesor updateProfesor(@NonNull Profesor profesor, @NonNull String id) {
        try {
            Profesor actual = Profesor.findById(UUID.fromString(id));
            actual.updateAttributes(profesor);
            actual.persist();
            return actual;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

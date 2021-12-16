package com.utec.software.resolvers.models;

import com.utec.software.model.Alumno;
import com.utec.software.model.CalidadEducativa;
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
public class CalidadEducativaResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_calidad_educativa_one")
    @Description("Inserta un usuario de tipo calidad educativa")
    @Transactional
    public CalidadEducativa createCalidadEducativa(@NonNull CalidadEducativa calidadEducativa) {
        try{
            calidadEducativa.persist();
            return calidadEducativa;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("calidad_educativa")
    @Description("Trae todos los usuarios de tipo calidad educativa")
    @Transactional
    public List<CalidadEducativa> getCalidadEducativas() {
        var arr = context.getSelectedFields();
        EntityGraph<CalidadEducativa> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(CalidadEducativa.class));

        return dbService.findAll(graph, CalidadEducativa.class);
    }

    @Query("calidad_educativa_by_pk")
    @Description("Trae un usuario de tipo calidad educativa basado en la llave primaria")
    @Transactional
    public CalidadEducativa getCalidadEducativa(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<CalidadEducativa> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(CalidadEducativa.class));

        return dbService.findById(graph, CalidadEducativa.class, id);
    }

    @Mutation("update_calidad_educativa_by_pk")
    @Description("Actualiza un usuario de calidad educativa basandose en la llave primaria")
    @Transactional
    public CalidadEducativa updateCalidadEducativa(@NonNull CalidadEducativa calidadEducativa, @NonNull String id) {
        try{
            CalidadEducativa actual = CalidadEducativa.findById(UUID.fromString(id));
            actual.updateAttributes(calidadEducativa);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

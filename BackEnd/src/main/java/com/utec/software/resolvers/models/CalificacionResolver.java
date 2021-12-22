package com.utec.software.resolvers.models;

import com.utec.software.model.Calificacion;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@GraphQLApi
public class CalificacionResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Query("calificacion")
    @Description("Trae todas las calificaciones")
    @Transactional
    public List<Calificacion> getCalificaciones() {
        var arr = context.getSelectedFields();
        EntityGraph<Calificacion> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Calificacion.class));

        return dbService.findAll(graph, Calificacion.class);
    }
}

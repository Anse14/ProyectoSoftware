package com.utec.software.resolvers.models;

import com.utec.software.model.Dimension;
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
public class DimensionResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_dimension_one")
    @Description("Inserta una dimension")
    @Transactional
    public Dimension createDimension(@NonNull Dimension dimension) {
        try {
            dimension.persist();
            return dimension;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("dimension")
    @Description("Trae todas las dimensiones")
    @Transactional
    public List<Dimension> getDimensiones() {
        var arr = context.getSelectedFields();
        EntityGraph<Dimension> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Dimension.class));

        return dbService.findAll(graph, Dimension.class);
    }

    @Query("dimension_by_pk")
    @Description("Trae una dimension basado en la llave primaria")
    @Transactional
    public Dimension getDimension(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Dimension> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Dimension.class));

        return dbService.findById(graph, Dimension.class, id);
    }

    @Mutation("update_dimension_by_pk")
    @Description("Actualiza una dimension basandose en la llave primaria")
    @Transactional
    public Dimension updateDimension(@NonNull Dimension dimension, @NonNull String id) {
        try {
            Dimension actual = Dimension.findById(UUID.fromString(id));
            actual.updateAttributes(dimension);
            actual.persist();
            return actual;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

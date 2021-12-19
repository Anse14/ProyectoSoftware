package com.utec.software.resolvers.models;

import com.utec.software.model.DimensionUsuario;
import com.utec.software.model.RubricaUsuario;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import oracle.ucp.util.Pair;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.NonNull;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class DimensionUsuarioResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Query("dimension_usuario")
    @Description("Trae todas las relaciones de dimension usuario")
    @Transactional
    public List<DimensionUsuario> getDimensionUsuario() {
        var arr = context.getSelectedFields();
        EntityGraph<DimensionUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(DimensionUsuario.class));

        return dbService.findAll(graph, DimensionUsuario.class);
    }

    @Query("dimension_usuario_by_pk")
    @Description("Trae la relacion dimension usuario en base al id")
    @Transactional
    public DimensionUsuario getDimensionUsuarioByPk(@NonNull String id) {
        var arr = context.getSelectedFields();
        EntityGraph<DimensionUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(DimensionUsuario.class));

        return dbService.findById(graph, DimensionUsuario.class, id);
    }

    @Query("dimension_usuario_by_rubrica_usuario")
    @Description("Trae todas las relaciones de dimension usuario")
    @Transactional
    public List<DimensionUsuario> getDimensionUsuarioByRubricaUsuario(@NonNull String rubrica_usuario_id) {
        var arr = context.getSelectedFields();
        EntityGraph<DimensionUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(DimensionUsuario.class));

        return dbService.findByRelation(
                graph,
                DimensionUsuario.class,
                new Pair<>("rubricaUsuario", UUID.fromString(rubrica_usuario_id))
        );
    }
}

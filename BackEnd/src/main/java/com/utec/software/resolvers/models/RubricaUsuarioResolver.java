package com.utec.software.resolvers.models;

import com.utec.software.model.*;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import oracle.ucp.util.Pair;
import org.eclipse.microprofile.graphql.*;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class RubricaUsuarioResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_rubrica_usuario_one")
    @Description("Inserta un valor de tipo rubrica usuario")
    @Transactional
    public RubricaUsuario createRubricaUsuario(@NonNull RubricaUsuario rubricaUsuario, String rubricaId, String alumnoId, String seccionId) {
        rubricaUsuario.persist();
        if (rubricaId != null) {
            var rubrica = (Rubrica) Rubrica.findById(UUID.fromString(rubricaId));
            rubricaUsuario.setRubrica(rubrica);
        }

        if (alumnoId != null) {
            var alumno = (Alumno) Alumno.findById(UUID.fromString(alumnoId));
            rubricaUsuario.setAlumno(alumno);
        }

        if (seccionId != null) {
            var seccion = (Seccion) Seccion.findById(UUID.fromString(seccionId));
            rubricaUsuario.setSeccion(seccion);
        }

        return rubricaUsuario;
    }

    @Query("rubrica_usuario")
    @Description("Trae todas las relaciones de rubrica usuario")
    @Transactional
    public List<RubricaUsuario> getRubricaUsuario() {
        var arr = context.getSelectedFields();
        EntityGraph<RubricaUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(RubricaUsuario.class));

        return dbService.findAll(graph, RubricaUsuario.class);
    }

    @Query("rubrica_usuario_by_rubrica_seccion")
    @Description("Trae todas las relaciones de rubrica usuario")
    @Transactional
    public List<RubricaUsuario> getRubricaUsuarioByRubricaSeccion(@NonNull UUID rubricaId, @NonNull UUID seccionId) {
        var arr = context.getSelectedFields();
        EntityGraph<RubricaUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(RubricaUsuario.class));

        return dbService.findByRelation(
                graph,
                RubricaUsuario.class,
                new Pair<String, Object>("rubrica", rubricaId),
                new Pair<String, Object>("seccion", seccionId)
        );
    }

    @Query("rubrica_usuario_by_rubrica")
    @Description("Trae todas las relaciones de rubrica usuario")
    @Transactional
    public List<RubricaUsuario> getRubricaUsuarioByRubrica(@NonNull UUID rubricaId) {
        var arr = context.getSelectedFields();
        EntityGraph<RubricaUsuario> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(RubricaUsuario.class));

        return dbService.findByRelation(
                graph,
                RubricaUsuario.class,
                new Pair<String, Object>("rubrica", rubricaId)
        );
    }
}

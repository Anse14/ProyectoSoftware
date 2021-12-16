package com.utec.software.resolvers;

import com.utec.software.model.Calificacion;
import com.utec.software.model.DimensionUsuario;
import com.utec.software.model.RubricaUsuario;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import oracle.ucp.util.Pair;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.NonNull;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.UUID;

@GraphQLApi
public class MutationResolvers {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("calificar_alumno")
    @Description("Mutacion para calificar a un alumno")
    @Transactional
    public DimensionUsuario calificar(@NonNull float nota, String descripcion, @NonNull String calificacion_id, @NonNull UUID rubrica_usuario_id) {
        var dimensionUsuarios = dbService.findByRelation(
                em.createEntityGraph(DimensionUsuario.class),
                DimensionUsuario.class,
                new Pair<>("calificacion", UUID.fromString(calificacion_id)),
                new Pair<>("rubricaUsuario", rubrica_usuario_id)
        );
        if(!dimensionUsuarios.isEmpty()) {
            var dimensionUsuario = dimensionUsuarios.get(0);
            dimensionUsuario.setNota(nota);
            dimensionUsuario.persist();
            return dimensionUsuario;
        }

        var dimensionUsuario = new DimensionUsuario();
        EntityGraph<Calificacion> graphCalificacion = em.createEntityGraph(Calificacion.class);
        graphCalificacion.addAttributeNodes("dimension");

        var calificacion = dbService.findById(graphCalificacion, Calificacion.class, calificacion_id);
        var rubricaUsuario = (RubricaUsuario) RubricaUsuario.findById(rubrica_usuario_id);

        if (descripcion != null) {
            dimensionUsuario.setDescripcion(descripcion);
        }

        dimensionUsuario.setNota(nota);
        dimensionUsuario.setCalificacion(calificacion);
        dimensionUsuario.setRubricaUsuario(rubricaUsuario);
        dimensionUsuario.setDimension(calificacion.getDimension());

        dimensionUsuario.persist();

        return dimensionUsuario;
    }
}

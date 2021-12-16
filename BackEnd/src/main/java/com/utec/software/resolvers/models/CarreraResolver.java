package com.utec.software.resolvers.models;

import com.utec.software.model.Alumno;
import com.utec.software.model.Carrera;
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
public class CarreraResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_carrera_one")
    @Description("Inserta una carrera")
    @Transactional
    public Carrera createCarrera(@NonNull Carrera carrera) {
        try{
            carrera.persist();
            return carrera;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("carrera")
    @Description("Trae todas las carreras")
    @Transactional
    public List<Carrera> getCarreraes() {
        var arr = context.getSelectedFields();
        EntityGraph<Carrera> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Carrera.class));

        return dbService.findAll(graph, Carrera.class);
    }

    @Query("carrera_by_pk")
    @Description("Trae una carrera basado en la llave primaria")
    @Transactional
    public Carrera getCarrera(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Carrera> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Carrera.class));

        return dbService.findById(graph, Carrera.class, id);
    }

    @Mutation("update_carrera_by_pk")
    @Description("Actualiza una carrera basandose en la llave primaria")
    @Transactional
    public Carrera updateCarrera(@NonNull Carrera carrera, @NonNull String id) {
        try{
            Carrera actual = Carrera.findById(UUID.fromString(id));
            actual.updateAttributes(carrera);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}


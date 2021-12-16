package com.utec.software.resolvers.models;

import com.utec.software.model.Curso;
import com.utec.software.model.Seccion;
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
public class SeccionResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_seccion_one")
    @Description("Inserta una seccion")
    @Transactional
    public Seccion createSeccion(@NonNull Seccion seccion, @NonNull String cursoId) {
        try {
            Curso curso = Curso.findById(UUID.fromString(cursoId));
            if(curso==null){
                return null;
            }
            seccion.setCurso(curso);
            seccion.persist();
            return seccion;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("seccion")
    @Description("Trae todas las secciones")
    @Transactional
    public List<Seccion> getSecciones() {
        var arr = context.getSelectedFields();
        EntityGraph<Seccion> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Seccion.class));

        return dbService.findAll(graph, Seccion.class);
    }

    @Query("seccion_by_pk")
    @Description("Trae una seccion basada en la llave primaria")
    @Transactional
    public Seccion getSeccion(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Seccion> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Seccion.class));

        return dbService.findById(graph, Seccion.class, id);
    }

    @Mutation("update_seccion_by_pk")
    @Description("Actualiza una seccion basandose en la llave primaria")
    @Transactional
    public Seccion updateSeccion(@NonNull Seccion seccion, @NonNull String id) {
        try{
            Seccion actual = Seccion.findById(UUID.fromString(id));
            actual.updateAttributes(seccion);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

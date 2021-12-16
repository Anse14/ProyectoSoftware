package com.utec.software.resolvers.models;

import com.utec.software.model.Carrera;
import com.utec.software.model.Curso;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import org.eclipse.microprofile.graphql.*;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class CursoResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_curso_one")
    @Description("Inserta un curso")
    @Transactional
    public Curso createCurso(@NonNull Curso curso, @NonNull String carreraId) {
        try{
            Carrera carrera = Carrera.findById(UUID.fromString(carreraId));
            if(carrera==null){
                return null;
            }
            List<Carrera> carreras = new ArrayList<>();
            carreras.add(carrera);
            curso.setCarreras(carreras);
            curso.persist();
            return curso;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("curso")
    @Description("Trae todos los cursos")
    @Transactional
    public List<Curso> getCursos() {
        var arr = context.getSelectedFields();
        EntityGraph<Curso> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Curso.class));

        return dbService.findAll(graph, Curso.class);
    }

    @Query("curso_by_pk")
    @Description("Trae un curso basado en la llave primaria")
    @Transactional
    public Curso getCurso(@NonNull String id) {
        var arr = context.getSelectedFields();

        EntityGraph<Curso> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Curso.class));

        return dbService.findById(graph, Curso.class, id);
    }

    @Mutation("update_curso_by_pk")
    @Description("Actualiza un curso basandose en la llave primaria")
    @Transactional
    public Curso updateCurso(@NonNull Curso curso, @NonNull String id) {
        try{
            Curso actual = Curso.findById(UUID.fromString(id));
            actual.updateAttributes(curso);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

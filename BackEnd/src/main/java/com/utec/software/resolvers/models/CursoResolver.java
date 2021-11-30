package com.utec.software.resolvers.models;

import com.utec.software.model.Carrera;
import com.utec.software.model.Curso;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class CursoResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_curso_one")
    @Description("Inserta un curso")
    @Transactional
    public Curso createCurso(Curso curso,String carreraId) {
        try{
            Carrera carrera = Carrera.findById(UUID.fromString(carreraId));
            if(carrera==null){
                return null;
            }
            curso.setCarrera(carrera);
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
        return Curso.findAll().list();
    }

    @Query("curso_by_pk")
    @Description("Trae un curso basado en la llave primaria")
    @Transactional
    public Curso getCurso(String id) {
        try{
            return Curso.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_curso_by_pk")
    @Description("Actualiza un curso basandose en la llave primaria")
    @Transactional
    public Curso updateCurso(Curso curso, String id) {
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

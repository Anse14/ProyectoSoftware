package com.utec.software.resolvers.models;

import com.utec.software.model.Curso;
import com.utec.software.model.Rubrica;
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
public class RubricaResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_rubrica_one")
    @Description("Inserta una rubrica")
    @Transactional
    public Rubrica createRubrica(Rubrica rubrica, String cursoId) {
        try{
            rubrica.setStatus(null);
            Curso curso = Curso.findById(UUID.fromString(cursoId));
            if(curso==null){
                return null;
            }
            rubrica.setCurso(curso);
            rubrica.persist();
            return rubrica;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("rubrica")
    @Description("Trae todas las rubricas")
    @Transactional
    public List<Rubrica> getRubricas() {
        return Rubrica.findAll().list();
    }

    @Query("rubrica_by_pk")
    @Description("Trae una rubrica basada en la llave primaria")
    @Transactional
    public Rubrica getRubrica(String id) {
        try{
            return Rubrica.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_rubrica_by_pk")
    @Description("Actualiza una rubrica basandose en la llave primaria")
    @Transactional
    public Rubrica updateRubrica(Rubrica rubrica, String id) {
        try{
            if(rubrica.getStatus()!=null){
                return null;
            }
            Rubrica actual = Rubrica.findById(UUID.fromString(id));
            actual.updateAttributes(rubrica);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

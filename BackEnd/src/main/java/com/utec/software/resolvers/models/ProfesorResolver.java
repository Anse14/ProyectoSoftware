package com.utec.software.resolvers.models;

import com.utec.software.model.Profesor;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@GraphQLApi
public class ProfesorResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_profesor_one")
    @Description("Inserta un profesor")
    @Transactional
    public Profesor createProfesor(Profesor profesor) {
        try{
            profesor.persist();
            return profesor;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("profesor")
    @Description("Trae todos los profesores")
    @Transactional
    public List<Profesor> getProfesores() {
        return Profesor.findAll().list();
    }

    @Query("profesor_by_pk")
    @Description("Trae un profesor basado en la llave primaria")
    @Transactional
    public Profesor getProfesor(String id) {
        try{
            return Profesor.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_profesor_by_pk")
    @Description("Actualiza un profesor basandose en la llave primaria")
    @Transactional
    public Profesor updateProfesor(Profesor profesor, String id) {
        try{
            Profesor actual = Profesor.findById(UUID.fromString(id));
            actual.updateAttributes(profesor);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

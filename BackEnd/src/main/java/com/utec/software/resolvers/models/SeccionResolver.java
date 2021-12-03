package com.utec.software.resolvers.models;

import com.utec.software.model.Curso;
import com.utec.software.model.Seccion;
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
public class SeccionResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_seccion_one")
    @Description("Inserta una seccion")
    @Transactional
    public Seccion createSeccion(Seccion seccion, String cursoId) {
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
    public List<Seccion> getSeccions() {
        return Seccion.findAll().list();
    }

    @Query("seccion_by_pk")
    @Description("Trae una seccion basada en la llave primaria")
    @Transactional
    public Seccion getSeccion(String id) {
        try{
            return Seccion.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_seccion_by_pk")
    @Description("Actualiza una seccion basandose en la llave primaria")
    @Transactional
    public Seccion updateSeccion(Seccion seccion, String id) {
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

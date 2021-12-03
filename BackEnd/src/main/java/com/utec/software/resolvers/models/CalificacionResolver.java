package com.utec.software.resolvers.models;

import com.utec.software.model.Calificacion;
import com.utec.software.model.Dimension;
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
public class CalificacionResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_calificacion_one")
    @Description("Inserta una calificacion")
    @Transactional
    public Calificacion createCalificacion(Calificacion calificacion, String dimensionId) {
        try {
            Dimension dimension = Dimension.findById(UUID.fromString(dimensionId));
            if(dimension==null){
                return null;
            }
            calificacion.setDimension(dimension);
            calificacion.persist();
            return calificacion;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("calificacion")
    @Description("Trae todas las calificaciones")
    @Transactional
    public List<Calificacion> getCalificacions() {
        return Calificacion.findAll().list();
    }

    @Query("calificacion_by_pk")
    @Description("Trae una calificacion basada en la llave primaria")
    @Transactional
    public Calificacion getCalificacion(String id) {
        try{
            return Calificacion.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_calificacion_by_pk")
    @Description("Actualiza una calificacion basandose en la llave primaria")
    @Transactional
    public Calificacion updateCalificacion(Calificacion calificacion, String id) {
        try{
            Calificacion actual = Calificacion.findById(UUID.fromString(id));
            actual.updateAttributes(calificacion);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

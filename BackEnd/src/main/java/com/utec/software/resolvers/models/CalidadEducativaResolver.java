package com.utec.software.resolvers.models;

import com.utec.software.model.CalidadEducativa;
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
public class CalidadEducativaResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_calidad_educativa_one")
    @Description("Inserta un usuario de tipo calidad educativa")
    @Transactional
    public CalidadEducativa createCalidadEducativa(CalidadEducativa calidadEducativa) {
        try{
            calidadEducativa.persist();
            return calidadEducativa;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Query("calidad_educativa")
    @Description("Trae todos los usuarios de tipo calidad educativa")
    @Transactional
    public List<CalidadEducativa> getCalidadEducativas() {
        return CalidadEducativa.findAll().list();
    }

    @Query("calidad_educativa_by_pk")
    @Description("Trae un usuario de tipo calidad educativa basado en la llave primaria")
    @Transactional
    public CalidadEducativa getCalidadEducativa(String id) {
        try{
            return CalidadEducativa.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_calidad_educativa_by_pk")
    @Description("Actualiza un usuario de calidad educativa basandose en la llave primaria")
    @Transactional
    public CalidadEducativa updateCalidadEducativa(CalidadEducativa calidadEducativa, String id) {
        try{
            CalidadEducativa actual = CalidadEducativa.findById(UUID.fromString(id));
            actual.updateAttributes(calidadEducativa);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

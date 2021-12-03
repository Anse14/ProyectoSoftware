package com.utec.software.resolvers.models;

import com.utec.software.model.Carrera;
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
public class CarreraResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_carrera_one")
    @Description("Inserta una carrera")
    @Transactional
    public Carrera createCarrera(Carrera carrera) {
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
        return Carrera.findAll().list();
    }

    @Query("carrera_by_pk")
    @Description("Trae una carrera basado en la llave primaria")
    @Transactional
    public Carrera getCarrera(String id) {
        try{
            return Carrera.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_carrera_by_pk")
    @Description("Actualiza una carrera basandose en la llave primaria")
    @Transactional
    public Carrera updateCarrera(Carrera carrera, String id) {
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


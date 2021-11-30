package com.utec.software.resolvers.models;

import com.utec.software.model.Rubrica;
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
public class DimensionResolver {
    @Inject
    CurrentVertxRequest request;

    @Mutation("insert_dimension_one")
    @Description("Inserta una dimension")
    @Transactional
    public Dimension createDimension(Dimension dimension, String rubricaId) {
        try {
            Rubrica rubrica = Rubrica.findById(UUID.fromString(rubricaId));
            if(rubrica==null){
                return null;
            }
            dimension.setRubrica(rubrica);
            dimension.persist();
            return dimension;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("dimension")
    @Description("Trae todas las dimensiones")
    @Transactional
    public List<Dimension> getDimensions() {
        return Dimension.findAll().list();
    }

    @Query("dimension_by_pk")
    @Description("Trae una dimension basada en la llave primaria")
    @Transactional
    public Dimension getDimension(String id) {
        try{
            return Dimension.findById(UUID.fromString(id));
        }catch (Exception e ){
            return null;
        }
    }

    @Mutation("update_dimension_by_pk")
    @Description("Actualiza una dimension basandose en la llave primaria")
    @Transactional
    public Dimension updateDimension(Dimension dimension, String id) {
        try{
            Dimension actual = Dimension.findById(UUID.fromString(id));
            actual.updateAttributes(dimension);
            actual.persist();
            return actual;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

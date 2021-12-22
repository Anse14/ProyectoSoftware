package com.utec.software.resolvers.models;

import com.utec.software.model.*;
import com.utec.software.schema.DimensionSchema;
import com.utec.software.services.DBService;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.graphql.api.Context;
import org.eclipse.microprofile.graphql.*;

import javax.inject.Inject;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.*;

@GraphQLApi
public class RubricaResolver {
    @Inject
    CurrentVertxRequest request;

    @Inject
    Context context;

    @Inject
    EntityManager em;

    @Inject
    DBService dbService;

    @Mutation("insert_rubrica_one")
    @Description("Inserta una rubrica")
    @Transactional
    public Rubrica createRubrica(@NonNull Rubrica rubrica, @NonNull String cursoId) {
        try {
            rubrica.setStatus(null);
            rubrica.setDimensiones(new ArrayList<>());
            Curso curso = Curso.findById(UUID.fromString(cursoId));
            if (curso == null) {
                return null;
            }
            rubrica.setCurso(curso);
            rubrica.persist();
            return rubrica;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Query("rubrica")
    @Description("Trae todas las rubricas")
    @Transactional
    public List<Rubrica> getRubricas() {
        var arr = context.getSelectedFields();
        EntityGraph<Rubrica> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Rubrica.class));

        return dbService.findAll(graph, Rubrica.class);
    }

    @Query("existedimension_rubrica_by_pk")
    @Description("Verifica si la rubrica tiene alguna dimension")
    public boolean verifydimensioninRubrica(@NonNull String id) {
        try {
            Rubrica actual = Rubrica.findById(UUID.fromString(id));
            return actual.getDimensiones() == null;
        } catch (Exception e) {
            return false;
        }
    }

    @Query("rubrica_by_pk")
    @Description("Trae una rubrica basada en la llave primaria")
    @Transactional
    public Rubrica getRubrica(@NonNull String id) {
        var arr = context.getSelectedFields();
        EntityGraph<Rubrica> graph = dbService.parseJsonArrayIntoGraph(arr, em.createEntityGraph(Rubrica.class));

        return dbService.findById(graph, Rubrica.class, id);
    }

    @Mutation("update_rubrica_by_pk")
    @Description("Actualiza una rubrica basandose en la llave primaria")
    @Transactional
    public boolean updateRubrica(@NonNull String id, @NonNull String profesorId) {
        try {
            Profesor profesor = Profesor.findById(UUID.fromString(profesorId));
            Rubrica actual = Rubrica.findById(UUID.fromString(id));
            if (actual.getStatus() != null || profesor == null) {
                return false;
            }
            actual.setLastUpdateProfesor(profesor);
            actual.setStatus(false);
            actual.persist();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Mutation("update_rubrica_dimension_by_pk")
    @Description("Inserta una dimension de la rubrica")
    @Transactional
    public Dimension updateDimensionRubrica(@NonNull String id, @NonNull DimensionSchema dimension) {
        try {
            Optional<Rubrica> actual = Rubrica.findByIdOptional(UUID.fromString(id));
            if (actual.isEmpty()) {
                return null;
            }

            Dimension dim = new Dimension();
            dim.setDescripcion(dimension.getDescripcion());
            dim.setRubrica(actual.get());
            dim.persist();

            List<Calificacion> calificaciones = new ArrayList<>();
            for (Calificacion calificacion : dimension.getCalficaciones()) {
                calificacion.setDimension(dim);
                calificacion.persist();
                calificaciones.add(calificacion);
            }

            dim.setCalificaciones(calificaciones);
            return dim;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Mutation("update_dimensioncalificacion_by_pk")
    @Description("Actualiza una calificacion de una dimension")
    @Transactional
    public Dimension updatecalificacion(String id, int nota, String descripcion, String title, boolean option) {
        try {
            Dimension actual = Dimension.findById(UUID.fromString(id));
            if (actual == null) {
                return null;
            }
            for (Calificacion calificacion : actual.getCalificaciones()) {
                if (Objects.equals(calificacion.getTitulo(), title)) {
                    calificacion.update(nota, descripcion, option);
                    calificacion.persist();
                    break;
                }
            }
            return actual;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Mutation("evaluate_rubrica_by_pk")
    @Description("Actualiza una rubrica basandose en la llave primaria")
    @Transactional
    public Rubrica evaluateRubrica(String id, String calidadEducativaId, boolean status) {
        try {
            Rubrica rubrica = Rubrica.findById(UUID.fromString(id));
            CalidadEducativa calidadEducativa = CalidadEducativa.findById(UUID.fromString(calidadEducativaId));
            if (rubrica == null || rubrica.getStatus() == null || rubrica.getStatus() || calidadEducativa == null) {
                return null;
            }
            rubrica.setCalidadEducativa(calidadEducativa);
            if (status) {
                rubrica.setStatus(true);
            } else {
                rubrica.setStatus(null);
                rubrica.setDimensiones(new ArrayList<>());
            }
            rubrica.persist();
            return rubrica;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
package com.utec.software.services;

import io.smallrye.mutiny.tuples.Tuple2;
import oracle.ucp.util.Pair;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonArray;
import javax.json.JsonValue;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Subgraph;
import javax.persistence.criteria.Predicate;
import java.util.*;

@ApplicationScoped
public class DBService {
    @Inject
    EntityManager em;

    public <T> List<T> findByRelation(EntityGraph<T> graph, Class<T> c, Pair<String, Object>... filters) {
        var criteriaBuilder = em.getCriteriaBuilder();
        var criteriaQuery = criteriaBuilder.createQuery(c);
        var root = criteriaQuery.from(c);
        List<Predicate> predicates = new ArrayList<>();
        for(var filter : filters) {
            var p = criteriaBuilder.equal(root.join(filter.get1st()).get("id"), filter.get2nd());
            predicates.add(p);
        }
        Predicate allPredicates = criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        criteriaQuery.where(allPredicates);
        var all = criteriaQuery.select(root).distinct(true);
        var allQuery = em.createQuery(all);
        allQuery.setHint("javax.persistence.loadgraph", graph);

        return allQuery.getResultList();
    }

    public <T> List<T> findBy(EntityGraph<T> graph, Class<T> c, Pair<String, Object>... filters) {
        var criteriaBuilder = em.getCriteriaBuilder();
        var criteriaQuery = criteriaBuilder.createQuery(c);
        var root = criteriaQuery.from(c);
        List<Predicate> predicates = new ArrayList<>();
        for(var filter : filters) {
            var p = root.get(filter.get1st()).in(filter.get2nd());
            predicates.add(p);
        }
        Predicate allPredicates = criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        criteriaQuery.where(allPredicates);
        var all = criteriaQuery.select(root).distinct(true);
        var allQuery = em.createQuery(all);
        allQuery.setHint("javax.persistence.loadgraph", graph);

        return allQuery.getResultList();
    }

    public <T> T findById(EntityGraph<T> graph, Class<T> c, String id) {
        var criteriaBuilder = em.getCriteriaBuilder();
        var criteriaQuery = criteriaBuilder.createQuery(c);
        var root = criteriaQuery.from(c);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"), UUID.fromString(id)));
        var all = criteriaQuery.select(root).distinct(true);
        var allQuery = em.createQuery(all);
        allQuery.setHint("javax.persistence.loadgraph", graph);

        T result = null;

        try {
            result = allQuery.getSingleResult();
        } catch(NoResultException e) {
            return null;
        }

        return result;
    }

    public <T> List<T> findAll(EntityGraph<T> graph, Class<T> c) {
        var criteriaBuilder = em.getCriteriaBuilder();
        var criteriaQuery = criteriaBuilder.createQuery(c);
        var root = criteriaQuery.from(c);
        var all = criteriaQuery.select(root).distinct(true);
        var allQuery = em.createQuery(all);
        allQuery.setHint("javax.persistence.loadgraph", graph);

        return allQuery.getResultList();
    }

    public <T> EntityGraph<T> parseJsonArrayIntoGraph(JsonArray arr, EntityGraph<T> graph) {
        arr.forEach(item -> {
            if(item.getValueType().equals(JsonValue.ValueType.OBJECT)) {
                var obj = item.asJsonObject();
                obj.forEach((k, v) -> {
                    if(Boolean.TRUE.equals(containsObj(v.asJsonArray()))) {
                        parseGraph(v.asJsonArray(), graph.addSubgraph(k));
                    } else {
                        graph.addAttributeNodes(k);
                    }
                });
            }
        });
        return graph;
    }

    private <T> void parseGraph(JsonArray arr, Subgraph<T> subgraph) {
        arr.forEach(item -> {
            if(JsonValue.ValueType.OBJECT.equals(item.getValueType())) {
                var obj = item.asJsonObject();
                obj.forEach((k, v) -> {
                    if(Boolean.TRUE.equals(containsObj(v.asJsonArray()))) {
                        parseGraph(v.asJsonArray(), subgraph.addSubgraph(k));
                    } else {
                        subgraph.addAttributeNodes(k);
                    }
                });
            }
        });
    }

    private Boolean containsObj(JsonArray arr) {
        for(var item : arr) {
            if(item.getValueType().equals(JsonValue.ValueType.OBJECT)) {
                return true;
            }
        }
        return false;
    }
}

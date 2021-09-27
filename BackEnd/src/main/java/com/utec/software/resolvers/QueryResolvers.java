package com.utec.software.resolvers;

import com.utec.software.schema.User;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;

@GraphQLApi
public class QueryResolvers {
    @Inject
    CurrentVertxRequest request;

    @Query("getUser")
    @Description("Brings a user")
    public Uni<User> getUser() {
        String email = request.getCurrent().request().getHeader("email");
        return Uni.createFrom().item(new User("123", email));
    }
}

package com.utec.software.resolvers;

import com.utec.software.schema.UserSchema;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;

import javax.inject.Inject;

@GraphQLApi
public class MutationResolvers {
    @Inject
    CurrentVertxRequest request;

    @Mutation("updateUserByEmail")
    @Description("Updates an user based on email")
    public UserSchema updateUser(String id, UserSchema usr) {
//        String email = request.getCurrent().request().getHeader("email");
        return usr;
    }
}

package com.utec.software.resolvers;

import com.utec.software.model.User;
import com.utec.software.schema.UserSchema;
import io.quarkus.vertx.http.runtime.CurrentVertxRequest;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;

import javax.inject.Inject;
import javax.transaction.Transactional;

@GraphQLApi
public class QueryResolvers {
    @Inject
    CurrentVertxRequest request;

    @Query("getUser")
    @Description("Brings a user")
    @Transactional
    public Uni<UserSchema> getUser() {
        String email = request.getCurrent().request().getHeader("email");
        var usr = User.findByEmail(email);
        if(usr.isEmpty()) {
            return  Uni.createFrom().item(new UserSchema(1));
        }
        var u = usr.get();
        return Uni.createFrom().item(new UserSchema(u.getEmail(), u.getNombre(), u.getRol().getTipo()));
    }


}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from '@environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '@shared/services/user.service';

const uri = environment.serverPath + '/graphql';

export function createApollo(httpLink: HttpLink, userService: UserService) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(async (operation, context) => {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('access_token');

    if (token === null) {
      return {};
    }

    const isExpired = helper.isTokenExpired(token);

    if (isExpired) {
      let status = await userService.refresh();
      if (status == 0) {
        token = localStorage.getItem('access_token');
      } else {
        console.log(status)
        return {};
      }
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all'
      }
    },
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, UserService],
    },
  ],
})
export class GraphQLModule { }

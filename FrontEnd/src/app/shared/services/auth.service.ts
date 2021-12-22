import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { GetUserGQL, GetUserQuery, RolEnum } from '@graphql';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private getUser: GetUserGQL,
    private userService: UserService
  ) {}

  login() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: SocialUser) => {
        this.loginWithGoogle(data.idToken);
      });
  }

  async loginWithGoogle(token: string) {
    let res: any = await this.http
      .post(environment.serverPath + '/auth/google-login', { token: token })
      .toPromise();
    if (res.status == 0) {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('refresh_token', res.refresh);
      this.userService.user.idToken = token;
      this.userService.user.email = res.email;
      this.continueLogin();
    }
  }

  async logout() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('access_token');
    if (token === null) {
      await this.userService.refresh();
    } else {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        await this.userService.refresh();
      }
    }

    let res = await this.http
      .get(environment.serverPath + '/logout')
      .toPromise();

    if (this.userService.user.idToken != '') {
      this.socialAuthService.signOut();
      this.userService.user.idToken = '';
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userService.user.email = '';
    this.router.navigateByUrl('/');
    this.userService.userEmmiter.next(null);
  }

  async fetchUser(): Promise<ApolloQueryResult<GetUserQuery>> {
    let data = await this.getUser.fetch().toPromise();
    if (data.data.getUser == null) {
      return null;
    }
    this.userService.user.nombre = data.data.getUser.nombre;
    this.userService.user.id = data.data.getUser.id;
    this.userService.user.codigo = data.data.getUser.codigo;
    this.userService.user.email = data.data.getUser.correo;
    this.userService.user.rol = data.data.getUser.tipo;
    this.userService.userEmmiter.next(this.userService.user);
    return data;
  }

  continueLogin() {
    this.fetchUser().then((data) => {
      if (data.data.getUser.tipo == RolEnum.Profesor) {
        this.router.navigateByUrl('/professor/dashboard');
      }
      if (data.data.getUser.tipo == RolEnum.Calidad) {
        this.router.navigateByUrl('/calidad/dashboard');
      }
    });
  }
}

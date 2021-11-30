import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { GetUserGQL, RolEnum } from '@graphql';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = {
  //   idToken: '',
  //   email: '',
  //   rol: RolEnum.Alumno,
  // };

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private getUser: GetUserGQL,
    private userService: UserService
  ) {
    let token = localStorage.getItem('refresh_token');
    if (token != null) {
      this.continueLogin();
    }
  }

  login() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: SocialUser) => {
        this.loginWithGoogle(data.idToken);
      });
  }

  loginWithGoogle(token: string) {
    this.http
      .post(environment.serverPath + '/auth/google-login', { token: token })
      .subscribe((res: any) => {
        if (res.status == 0) {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('refresh_token', res.refresh);
          this.userService.user.idToken = token;
          this.userService.user.email = res.email;
          this.continueLogin();
        }
      });
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

    this.http.get(environment.serverPath + '/logout').subscribe((res) => {
      if (this.userService.user.idToken != '') {
        this.socialAuthService.signOut();
        this.userService.user.idToken = '';
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.userService.user.email = '';
      this.router.navigateByUrl('/');
    });
  }

  private continueLogin() {
    this.getUser.fetch().subscribe((data) => {
      if (data.data.getUser == null) {
        return;
      }
      this.userService.user.codigo = data.data.getUser.codigo;
      this.userService.user.email = data.data.getUser.correo;
      this.userService.user.rol = data.data.getUser.tipo;
      if (data.data.getUser.tipo == RolEnum.Profesor) {
        this.router.navigateByUrl('/professor/dashboard');
      }
      if (data.data.getUser.tipo == RolEnum.Alumno) {
        this.router.navigateByUrl('/professor/dashboard');
      }
      if (data.data.getUser.tipo == RolEnum.Calidad) {
        this.router.navigateByUrl('/calidad/dashboard');
      }
    });
  }
}

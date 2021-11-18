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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = {
    idToken: '',
    email: '',
    rol: RolEnum.Alumno,
  };

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private getUser: GetUserGQL
  ) {}

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
          this.user.idToken = token;
          this.user.email = res.email;
          this.continueLogin();
        }
      });
  }

  logout() {
    this.http.get(environment.serverPath + '/logout').subscribe((res) => {
      if (this.user.idToken != '') {
        this.socialAuthService.signOut();
        this.user.idToken = '';
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.user.email = '';
      this.router.navigateByUrl('/');
    });
  }

  private continueLogin() {
    this.getUser.fetch().subscribe((data) => {
      if (data.data.getUser.status != 0) {
        return;
      }
      this.user.rol = data.data.getUser.rol;
      if (data.data.getUser.rol == RolEnum.Profesor) {
        this.router.navigateByUrl('/professor/dashboard');
      }
      if (data.data.getUser.rol == RolEnum.Alumno) {
        this.router.navigateByUrl('/alumno');
      }
      if (data.data.getUser.rol == RolEnum.Calidad) {
        this.router.navigateByUrl('/calidad/dashboard');
      }
    });
  }
}

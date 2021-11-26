import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environment/environment';
import { RolEnum } from '@graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {
    idToken: '',
    email: '',
    rol: RolEnum.Alumno,
  };

  constructor(private http: HttpClient) { }

  refresh(): Promise<any> {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('access_token');
    let body = helper.decodeToken(token);
    this.user.email = body.sub;
    return this.http.post(environment.serverPath + '/auth/refresh', {
      email: this.user.email,
      refresh: localStorage.getItem('refresh_token'),
    }).toPromise().then((res: any) => {
      if(res.status == 0) {
        localStorage.setItem('access_token', res.token);
      }
      return res.status;
    })
  }
}

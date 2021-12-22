import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RolEnum } from '@graphql';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private user: UserService,
    private auth: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let rvalue = false;
    if (route.url.length == 0) {
      this.verifyAccessToken(
        (token) => {
          rvalue = false;
          this.auth.continueLogin();
        },
        () => {
          rvalue = true;
        }
      );
    } else {
      this.verifyAccessToken(
        (token) => {
          rvalue = true;
          if (this.user.user.id == '') {
            this.auth.fetchUser().then((data) => {
              let next = this.getNextRoute();
              if (next != route.url.toString()) {
                this.router.navigateByUrl(`${next}/dashboard`);
              }
            });
          }
        },
        () => {
          rvalue = false;
          this.router.navigateByUrl('/');
        }
      );
    }
    return rvalue;
  }

  verifyAccessToken(f1: (string) => void, f2: () => void) {
    let token = localStorage.getItem('access_token');
    if (token != null) {
      f1(token);
    } else {
      f2();
    }
  }

  getNextRoute(): string {
    if (this.user.user.rol == RolEnum.Profesor) {
      return 'calidad';
    }
    if (this.user.user.rol == RolEnum.Calidad) {
      return 'calidad';
    }
    return '/';
  }
}

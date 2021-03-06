import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RolEnum } from '@graphql';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) {}
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
          this.router.navigateByUrl(this.getNextRoute());
        },
        () => {
          rvalue = true;
        }
      );
    } else {
      this.verifyAccessToken(
        (token) => {
          rvalue = true;
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
      return '/professor/dashboard';
    }
    if (this.user.user.rol == RolEnum.Alumno) {
      return '/professor/dashboard';
    }
    if (this.user.user.rol == RolEnum.Calidad) {
      return '/professor/dashboard';
    }
    return '/dashboard';
  }
}

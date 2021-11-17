import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

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
    return '/dashboard';
  }
}

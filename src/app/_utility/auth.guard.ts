import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from '../_service/authentication.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authenticationService.currentTokenValue;
    if (token) {
      // user already authorised returning true
      return true;
    }

    // used isn't logged in redirecting to login page
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}

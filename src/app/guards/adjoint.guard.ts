import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'app/Service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjointGuard implements CanActivate {
  helper = new JwtHelperService();
  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
    if (this.auth.hasToken()) {
      const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
      // console.log(decodedToken.username);
      const roles: string[] = decodedToken.roles;
      if (roles.includes('ADJOINT_COORDONATEUR')) {
        this.router.navigate(['/']);
        return false;
      }
  }
}
  
}

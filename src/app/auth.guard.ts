import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  helper = new JwtHelperService();
  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
    //console.log(this.auth.hasToken());
    
    if(!this.auth.hasToken()) {
      const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
          // console.log(decodedToken.username);
          // const roles: string[] = decodedToken.roles;
          // console.log(roles);
          
          // if (roles.includes('ROLE_COORDINATEUR')) {
          //   this.router.navigate(['/']);
          //   return false;
          // }
          this.router.navigate(['/']);
          return false;
    }
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  // tslint:disable-next-line:typedef  
  canActivate(){
    
    if (!this.auth.hasToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return false;
  }
}

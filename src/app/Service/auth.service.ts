import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'app/Model/User.model';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  /**
   * Stock le token si l'utilisateur est connecter
   * @returns {boolean}
   */
   public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  /**
   * Connexion de l'utilisateur et prend en parametre, le login et le password
   * @param username
   * @param password
   */
  // tslint:disable-next-line:typedef
  isLogin(username: string, password: string){
    const body = '{"username":"' + username + '","password":"' + password + '"}';
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(`${envVars.url}/login`, body, {headers: header});
  }
  /**
   * Deconnexion avec la destruction du token
   */
  // tslint:disable-next-line:typedef
  isLogOut(){
    localStorage.removeItem('token');
    localStorage.clear()
  }
  getUserConnected(codeEtudiant: any): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/users?username=${codeEtudiant}`);
  }
}

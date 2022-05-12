import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { ProfilModel } from 'app/Model/Profil.model';
import { UserModel } from 'app/Model/User.model';
import { envVars } from 'envVars';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeService {

  headers = new HttpHeaders({Accept: '*/*'});
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  addCourierArriver(CourierArriver: any): Observable<CourierModel> {
    return this.httpClient.post<CourierModel>(`${envVars.url}/coud/courier_arrivers`, CourierArriver, {headers: this.headers});
  }
  addCourierDepart(CourierDepart: any): Observable<CourierModel> {
    return this.httpClient.post<CourierModel>(`${envVars.url}/coud/courier_departs`, CourierDepart, {headers: this.headers});
  }
  addFicheDeControle(FicheDeControle: any): Observable<FicheDeControlModel> {
    return this.httpClient.post<FicheDeControlModel>(`${envVars.url}/coud/fiche_de_controles`, FicheDeControle, {headers: this.headers});
  }
  addUser(ObjetUser: any): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${envVars.url}/coud/users`, ObjetUser, {headers: this.headers});
  }
  updateUser(username: any): Observable<any>{
    return this.httpClient.put<any>(envVars.url+'/coud/users' + '/' + username.id, username, {headers: this.headers});
  }
  getProfils(): Observable<ProfilModel>{
    return this.httpClient.get<ProfilModel>(`${envVars.url}/coud/profils`);
  }
  getControleurs(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/controleurs`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { Facture } from 'app/Model/Facture.model';
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

  updateCourrierArriver(objetCourierArriver: any): Observable<any>{
    return this.httpClient.put<any>(`${envVars.url}/coud/courier_arrivers/`+ objetCourierArriver.id, objetCourierArriver, {headers: this.headers});
  }
  addCourierArriver(CourierArriver: CourierModel): Observable<CourierModel> {
    return this.httpClient.post<CourierModel>(`${envVars.url}/coud/courier_arrivers`, CourierArriver, {headers: this.headers});
  }
  addCourierDepart(CourierDepart: any): Observable<CourierModel> {
    return this.httpClient.post<CourierModel>(`${envVars.url}/coud/courier_departs`, CourierDepart, {headers: this.headers});
  }
  updateCourrierDepart(objetCourierDepart: any): Observable<any>{
    return this.httpClient.put<any>(`${envVars.url}/coud/courier_departs/`+ objetCourierDepart.id, objetCourierDepart, {headers: this.headers});
  }
  addFicheDeControle(FicheDeControle: any): Observable<FicheDeControlModel> {
    return this.httpClient.post<FicheDeControlModel>(`${envVars.url}/coud/fiche_de_controles`, FicheDeControle, {headers: this.headers});
  }
  updateFicheDeControle(FicheDeControle: any): Observable<any>{
    return this.httpClient.put<any>(envVars.url+'/coud/fiche_de_controles' + '/' + FicheDeControle.id, FicheDeControle, {headers: this.headers});
  }
  addUser(ObjetUser: any): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${envVars.url}/coud/users`, ObjetUser, {headers: this.headers});
  }
  updateCoordonateur(username: any): Observable<any>{
    return this.httpClient.put<any>(envVars.url+'/coud/coordinateurs' + '/' + username.id, username, {headers: this.headers});
  }
  updateControleur(username: any): Observable<any>{
    return this.httpClient.put<any>(envVars.url+'/coud/controleurs' + '/' + username.id, username, {headers: this.headers});
  }
  updateAssistante(username: any): Observable<any>{
    return this.httpClient.put<any>(envVars.url+'/coud/assistantes' + '/' + username.id, username, {headers: this.headers});
  }
  getProfils(): Observable<ProfilModel>{
    return this.httpClient.get<ProfilModel>(`${envVars.url}/coud/profils`);
  }
  getControleurs(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/controleurs`);
  }
  getControleursByUsername(username: UserModel): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/controleurs?username=${username}`);
  }
  getCoordonateurs(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/coordinateurs`);
  }
  getCoordonateursByUsername(username: UserModel): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/coordinateurs?username=${username}`);
  }
  getAssistanteByUsername(username: UserModel): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/assistantes?username=${username}`);
  }
  getAssistantes(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/assistantes`);
  }
  getCourriers(): Observable<CourierModel>{
    return this.httpClient.get<CourierModel>(`${envVars.url}/coud/courier_arrivers`);
  }
  getAllCourriers(): Observable<CourierModel>{
    return this.httpClient.get<CourierModel>(`${envVars.url}/coud/couriers`);
  }
  getAllCourriersDepart(): Observable<CourierModel>{
    return this.httpClient.get<CourierModel>(`${envVars.url}/coud/courier_departs`);
  }
  getOneCourriers(object1: any): Observable<CourierModel>{
    return this.httpClient.get<CourierModel>(`${envVars.url}/coud/couriers?object=${object1}`);
  }
  addFActure(facture: any): Observable<Facture> {
    return this.httpClient.post<Facture>(`${envVars.url}/coud/factures`, facture, {headers: this.headers});
  }
  getFiche(): Observable<FicheDeControlModel>{
    return this.httpClient.get<FicheDeControlModel>(`${envVars.url}/coud/fiche_de_controles`);
  }
  getAllUsers(): Observable<UserModel>{
    return this.httpClient.get<UserModel>(`${envVars.url}/coud/users`);
  }
}

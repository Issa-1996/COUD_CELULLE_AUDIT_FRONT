import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from 'express';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { RapportsComponent } from './Pages/rapports/rapports.component';
import { CouriersComponent } from './Pages/couriers/couriers.component';
import { FactureComponent } from './Pages/facture/facture.component';
import { AssistanteComponent } from './Pages/Agents/assistante/assistante.component';
import { ControleursComponent } from './Pages/Agents/controleurs/controleurs.component';
import { CoordinateurComponent } from './Pages/Agents/coordinateur/coordinateur.component';
import { FicheDeControleComponent } from './Pages/fiche-de-controle/fiche-de-controle.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { FicheDeControleAffichageComponent } from './Pages/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './Material/matmodule.service';
import { AddUserComponent } from './Pages/Agents/add-user/add-user.component';
import { UpdateUserComponent } from './Pages/Agents/update-user/update-user.component';
import { CourierDepartComponent } from './Pages/courier-depart/courier-depart.component';
import { CourierArriverComponent } from './Pages/courier-arriver/courier-arriver.component';
import { FicheDeControleInterneComponent } from './Pages/fiche-de-controle-interne/fiche-de-controle-interne.component';
import { AuthService } from './Service/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokeInterceptorService } from './Service/toke-interceptor.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { AfficheUserComponent } from './Pages/Agents/affiche-user/affiche-user.component';
import { MethodeService } from './Service/methode.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ContainerComponent,
    InscriptionComponent,
    AccueilComponent,
    RapportsComponent,
    CouriersComponent,
    FactureComponent,
    AssistanteComponent,
    ControleursComponent,
    CoordinateurComponent,
    FicheDeControleComponent,
    UsersComponent,
    FicheDeControleAffichageComponent,
    AddUserComponent,
    UpdateUserComponent,
    CourierDepartComponent,
    CourierArriverComponent,
    FicheDeControleInterneComponent,
    AfficheUserComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    MethodeService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    TokeInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './Material/matmodule.service';
import { AddUserComponent } from './Pages/Agents/add-user/add-user.component';
import { UpdateUserComponent } from './Pages/Agents/update-user/update-user.component';
import { AuthService } from './Service/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokeInterceptorService } from './Service/toke-interceptor.service';
import { AfficheUserComponent } from './Pages/Agents/affiche-user/affiche-user.component';
import { MethodeService } from './Service/methode.service';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CourierDepartComponent } from './Pages/Courriers/CourriersDeparts/courier-depart/courier-depart.component';
import { CourierArriverComponent } from './Pages/Courriers/CourriersArrivers/courier-arriver/courier-arriver.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FicheDeControleComponent } from './Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
import { FicheDeControleInterneComponent } from './Pages/FicheDEControles/fiche-de-controle-interne/fiche-de-controle-interne.component';
import { FicheDeControleModifierComponent } from './Pages/FicheDEControles/fiche-de-controle-modifier/fiche-de-controle-modifier.component';
import { UpdateCourrierComponent } from './Pages/Courriers/CourriersArrivers/update-courrier/update-courrier.component';
import { FicheDeControleAffichageComponent } from './Pages/FicheDEControles/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { CourierArriverAffichageComponent } from './Pages/Courriers/CourriersArrivers/courier-arriver-affichage/courier-arriver-affichage.component';
import { CourrierListeComponent } from './Pages/Courriers/CourriersArrivers/courrier-liste/courrier-liste.component';
import { ListCourriersDepartComponent } from './Pages/Courriers/CourriersDeparts/list-courriers-depart/list-courriers-depart.component';
import { CouriersComponent } from './Pages/Courriers/CourriersArrivers/couriers/couriers.component';
import { UpdateCourrierDepartComponent } from './Pages/Courriers/CourriersDeparts/update-courrier-depart/update-courrier-depart.component';
import { CourrierDepartAffichageComponent } from './Pages/Courriers/CourriersDeparts/courrier-depart-affichage/courrier-depart-affichage.component';
import { TransferDataService } from './Service/transfer-data.service';
import { SearchService } from './Service/search.service';
import { CourriersValiderComponent } from './Pages/Courriers/courriers-valider/courriers-valider.component';
import { TotalArriverComponent } from './Pages/Courriers/CourriersArrivers/total-arriver/total-arriver.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ContainerComponent,
    FicheDeControleComponent,
    UsersComponent,
    FicheDeControleAffichageComponent,
    AddUserComponent,
    UpdateUserComponent,
    CourierDepartComponent,
    CourierArriverComponent,
    FicheDeControleInterneComponent,
    AfficheUserComponent,
    FooterComponent,
    CourierArriverAffichageComponent,
    CourrierListeComponent,
    PaginationComponent,
    FicheDeControleModifierComponent,
    ListCourriersDepartComponent,
    UpdateCourrierComponent,
    CouriersComponent,
    UpdateCourrierDepartComponent,
    CourrierDepartAffichageComponent,
    CourriersValiderComponent,
    TotalArriverComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatPaginatorModule,
  ],
  providers: [
    AuthService,
    MethodeService,
    JwtHelperService,
    TransferDataService,
    SearchService,
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

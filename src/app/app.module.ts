import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FicheDeControleAffichageComponent } from './Pages/fiche-de-controle-affichage/fiche-de-controle-affichage.component';

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
    FicheDeControleAffichageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ContainerComponent } from './container/container.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { CouriersComponent } from './Pages/couriers/couriers.component';
import { FicheDeControleComponent } from './Pages/fiche-de-controle/fiche-de-controle.component';
import { FicheDeControleAffichageComponent } from './Pages/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { RapportsComponent } from './Pages/rapports/rapports.component';
import { FactureComponent } from './Pages/facture/facture.component';
import { AssistanteComponent } from './Pages/Agents/assistante/assistante.component';
import { ControleursComponent } from './Pages/Agents/controleurs/controleurs.component';
import { CoordinateurComponent } from './Pages/Agents/coordinateur/coordinateur.component';
import { UsersComponent } from './Pages/Agents/users/users.component';

const routes: Routes =[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent },
  {path: 'container', component: ContainerComponent,
    children: [
    {path: 'accueil', component: DashboardComponent },
    {path: 'courier', component: CouriersComponent },
    {path: 'fichedecontrole', component: FicheDeControleComponent },
    {path: 'fichedecontroleaffichage', component: FicheDeControleAffichageComponent },
    {path: 'rapport', component: RapportsComponent },
    {path: 'facture', component: FactureComponent },
    {path: 'assistante', component: AssistanteComponent },
    {path: 'cotroleur', component: ControleursComponent },
    {path: 'coordinateur', component: CoordinateurComponent },
    {path: 'users', component: UsersComponent }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

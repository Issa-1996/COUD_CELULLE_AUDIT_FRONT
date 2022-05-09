import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ContainerComponent } from './container/container.component';
import { CouriersComponent } from './Pages/couriers/couriers.component';
import { FicheDeControleComponent } from './Pages/fiche-de-controle/fiche-de-controle.component';
import { FicheDeControleAffichageComponent } from './Pages/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { RapportsComponent } from './Pages/rapports/rapports.component';
import { FactureComponent } from './Pages/facture/facture.component';
import { AssistanteComponent } from './Pages/Agents/assistante/assistante.component';
import { ControleursComponent } from './Pages/Agents/controleurs/controleurs.component';
import { CoordinateurComponent } from './Pages/Agents/coordinateur/coordinateur.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { FicheDeControleInterneComponent } from './Pages/fiche-de-controle-interne/fiche-de-controle-interne.component';
import { AuthGuard } from './auth.guard';
import { AfficheUserComponent } from './Pages/Agents/affiche-user/affiche-user.component';

const routes: Routes =[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent },
  {path: 'container', component: ContainerComponent, canActivate: [AuthGuard],
    children: [
    {path: 'accueil', component: DashboardComponent, canActivate: [AuthGuard] },
    {path: 'courier', component: CouriersComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontrole', component: FicheDeControleComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontroleaffichage', component: FicheDeControleAffichageComponent, canActivate: [AuthGuard] },
    {path: 'rapport', component: RapportsComponent, canActivate: [AuthGuard] },
    {path: 'facture', component: FactureComponent, canActivate: [AuthGuard] },
    {path: 'assistante', component: AssistanteComponent, canActivate: [AuthGuard] },
    {path: 'cotroleur', component: ControleursComponent, canActivate: [AuthGuard] },
    {path: 'coordinateur', component: CoordinateurComponent, canActivate: [AuthGuard] },
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    {path: 'utilisateurs', component: AfficheUserComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontroleinterne', component: FicheDeControleInterneComponent, canActivate: [AuthGuard]}
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

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { AuthGuard } from './auth.guard';
import { AfficheUserComponent } from './Pages/Agents/affiche-user/affiche-user.component';
import { FooterComponent } from './footer/footer.component';
import { FicheDeControleComponent } from './Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
import { FicheDeControleInterneComponent } from './Pages/FicheDEControles/fiche-de-controle-interne/fiche-de-controle-interne.component';
import { FicheDeControleAffichageComponent } from './Pages/FicheDEControles/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { CouriersComponent } from './Pages/Courriers/CourriersArrivers/couriers/couriers.component';

const routes: Routes =[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LoginComponent },
  {path: 'container', component: ContainerComponent, canActivate: [AuthGuard],
    children: [
    {path: 'accueil', component: DashboardComponent, canActivate: [AuthGuard] },
    {path: 'courier', component: CouriersComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontrole', component: FicheDeControleComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontroleaffichage', component: FicheDeControleAffichageComponent, canActivate: [AuthGuard] },
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    {path: 'utilisateurs', component: AfficheUserComponent, canActivate: [AuthGuard] },
    {path: 'fichedecontroleinterne', component: FicheDeControleInterneComponent, canActivate: [AuthGuard]},
    {path: 'footer', component: FooterComponent, canActivate: [AuthGuard]}
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

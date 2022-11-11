import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { CourierArriverComponent } from './Pages/Courriers/CourriersArrivers/courier-arriver/courier-arriver.component';
import { CouriersComponent } from './Pages/Courriers/CourriersArrivers/couriers/couriers.component';
import { FicheDeControleAffichageComponent } from './Pages/FicheDEControles/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { FicheDeControleComponent } from './Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'container', component: ContainerComponent, canActivate:[AuthGuardGuard],
    children: [
    {path: 'courier', component: CouriersComponent, canActivate:[AuthGuardGuard] },
    {path: 'courierArrivee', component: CourierArriverComponent, canActivate:[AuthGuardGuard] },
    {path: 'fichedecontrole', component: FicheDeControleComponent, canActivate:[AuthGuardGuard] },
    {path: 'fichedecontroleaffichage', component: FicheDeControleAffichageComponent, canActivate:[AuthGuardGuard] },
    {path: 'users', component: UsersComponent, canActivate:[AuthGuardGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

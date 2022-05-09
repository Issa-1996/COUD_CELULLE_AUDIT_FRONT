import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { ContainerComponent } from './container/container.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { AssistanteComponent } from './Pages/Agents/assistante/assistante.component';
import { ControleursComponent } from './Pages/Agents/controleurs/controleurs.component';
import { CoordinateurComponent } from './Pages/Agents/coordinateur/coordinateur.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { CourierArriverComponent } from './Pages/courier-arriver/courier-arriver.component';
import { CouriersComponent } from './Pages/couriers/couriers.component';
import { FactureComponent } from './Pages/facture/facture.component';
import { FicheDeControleAffichageComponent } from './Pages/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { FicheDeControleComponent } from './Pages/fiche-de-controle/fiche-de-controle.component';
import { RapportsComponent } from './Pages/rapports/rapports.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'container', component: ContainerComponent, canActivate:[AuthGuardGuard],
    children: [
    {path: 'accueil', component: AccueilComponent, canActivate:[AuthGuardGuard] },
    {path: 'courier', component: CouriersComponent, canActivate:[AuthGuardGuard] },
    {path: 'courierArriver', component: CourierArriverComponent, canActivate:[AuthGuardGuard] },
    {path: 'fichedecontrole', component: FicheDeControleComponent, canActivate:[AuthGuardGuard] },
    {path: 'fichedecontroleaffichage', component: FicheDeControleAffichageComponent, canActivate:[AuthGuardGuard] },
    {path: 'rapport', component: RapportsComponent, canActivate:[AuthGuardGuard] },
    {path: 'facture', component: FactureComponent, canActivate:[AuthGuardGuard] },
    {path: 'assistante', component: AssistanteComponent, canActivate:[AuthGuardGuard] },
    {path: 'cotroleur', component: ControleursComponent, canActivate:[AuthGuardGuard] },
    {path: 'coordinateur', component: CoordinateurComponent, canActivate:[AuthGuardGuard] },
    {path: 'users', component: UsersComponent, canActivate:[AuthGuardGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

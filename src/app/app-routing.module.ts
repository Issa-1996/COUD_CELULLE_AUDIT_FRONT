import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { AssistanteComponent } from './Pages/Agents/assistante/assistante.component';
import { ControleursComponent } from './Pages/Agents/controleurs/controleurs.component';
import { CoordinateurComponent } from './Pages/Agents/coordinateur/coordinateur.component';
import { UsersComponent } from './Pages/Agents/users/users.component';
import { CouriersComponent } from './Pages/couriers/couriers.component';
import { FactureComponent } from './Pages/facture/facture.component';
import { FicheDeControleComponent } from './Pages/fiche-de-controle/fiche-de-controle.component';
import { RapportsComponent } from './Pages/rapports/rapports.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent },
  {path: 'container', component: ContainerComponent,
    children: [
    {path: 'accueil', component: AccueilComponent },
    {path: 'courier', component: CouriersComponent },
    {path: 'fichedecontrole', component: FicheDeControleComponent },
    {path: 'rapport', component: RapportsComponent },
    {path: 'facture', component: FactureComponent },
    {path: 'assistante', component: AssistanteComponent },
    {path: 'cotroleur', component: ControleursComponent },
    {path: 'coordinateur', component: CoordinateurComponent },
    {path: 'users', component: UsersComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

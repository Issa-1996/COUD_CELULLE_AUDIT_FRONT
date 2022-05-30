import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Facture } from 'app/Model/Facture.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-facture-affichage',
  templateUrl: './facture-affichage.component.html',
  styleUrls: ['./facture-affichage.component.css']
})
export class FactureAffichageComponent implements OnInit {

  controleur:UserModel;
  helper = new JwtHelperService();
  Connecter:UserModel;
  objetFac:String;
  numerFac:string;
  montantFac:String;
  beneficaire:String;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.connectUser();
  }

  connectUser(){
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authService.getUserConnected(username)
    .subscribe(data=>{
      const size=data['hydra:member'][0]["couriers"].length;
      this.objetFac=data['hydra:member'][0]['couriers'][size-1]['facture']['object'];
      this.numerFac=data['hydra:member'][0]['couriers'][size-1]['facture']['numeroFacture'];
      this.montantFac=data['hydra:member'][0]['couriers'][size-1]['facture']['montant'];
      this.beneficaire=data['hydra:member'][0]['couriers'][size-1]['facture']['beneficaire'];
      //console.log(this.facture);
      
      this.controleur=data['hydra:member'][0];
      this.Connecter=data['hydra:member'][0]["couriers"][size-1];
    })
  }
}

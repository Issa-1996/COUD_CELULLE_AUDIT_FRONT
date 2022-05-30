import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-courier-arriver-affichage',
  templateUrl: './courier-arriver-affichage.component.html',
  styleUrls: ['./courier-arriver-affichage.component.css']
})
export class CourierArriverAffichageComponent implements OnInit {

  controleur:UserModel;
  helper = new JwtHelperService();
  Connecter:UserModel;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.connectUser();
  }

  connectUser(){
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    console.log(username);
    
    this.authService.getUserConnected(username)
    .subscribe(data=>{
      console.log(data);
      
      const size=data['hydra:member'][0]["couriers"].length;
      this.controleur=data['hydra:member'][0];
      this.Connecter=data['hydra:member'][0]["couriers"][size-1];
    })
  }
}

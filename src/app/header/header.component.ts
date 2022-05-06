import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  helper = new JwtHelperService();
  public  role: any[];
  public prenom: any[];
  public nom: any[];
  constructor(private router: Router, private authServive: AuthService) { }

  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    //console.log(localStorage.getItem('connectedUser'));
    const userConnect: string[] = JSON.parse(localStorage.getItem('connectedUser'));
    this.prenom= userConnect["prenom"];
    this.nom= userConnect["nom"];
  }
  logOout(): any {
    this.authServive.isLogOut();
    this.router.navigate(['/']);
  }
}

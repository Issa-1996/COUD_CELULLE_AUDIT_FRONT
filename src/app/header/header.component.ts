import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  helper = new JwtHelperService();
  public role: any[];
  prenom = '';
  nom = '';
  user: UserModel;
  decodedToken: any;
  constructor(private router: Router, private authServive: AuthService) {}

  ngOnInit(): void {
    this.connectUser();
    this.decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = this.decodedToken.roles;
  }
  logOout(): any {
    this.authServive.isLogOut();
    this.router.navigate(['/']);
  }
  connectUser() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authServive.getUserConnected(username).subscribe((data) => {
      this.user = data['hydra:member'][0];
      this.prenom = this.user['prenom'];
      this.nom = this.user['nom'];  
    });
  }
}

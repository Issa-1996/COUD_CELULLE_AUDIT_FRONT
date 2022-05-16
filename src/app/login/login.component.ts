import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addForm: FormGroup;
  helper = new JwtHelperService();
  username: any;
  password: any;
  erreurUsername = '';
  erreurPassword = '';
  erreur = '';
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router : Router) { }
  hide = true;
  sending = false;
  btnText = 'Connexion';


  ngOnInit(): void {
    localStorage.removeItem('token');
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.addForm.get('username').valueChanges.subscribe(
      () => { this.erreurUsername = ''; this.erreur = ''; }
    );
    this.addForm.get('password').valueChanges.subscribe(
      () => { this.erreurPassword = ''; this.erreur = ''; }
    );
  }

  /**
   * Connexion de l'utilisateur qui appel la methode isLogin() de auth.service.ts
   */
   onSignIn(){
    if (this.addForm.get('username').value.trim() === '') {
      this.erreurUsername = 'Nom d\'utilisateur obligatoire !';
    }
    if (this.addForm.get('password').value.trim() === '') {
      this.erreurPassword = 'Mot de passe obligatoire !';

    } else {
      if (this.addForm.invalid){
        return;
      }
    }
    this.sending = true;
      this.btnText = 'Patientez...';
      this.authService.isLogin(this.addForm.get('username').value, this.addForm.get('password').value).subscribe(
        (data: any) => {
            localStorage.setItem('token', data.token);
            const decodedToken = this.helper.decodeToken(data.token);
            const roles: string[] = decodedToken.roles;

            if (roles.includes('ROLE_COORDINATEUR')){
              this.router.navigate(['/container/accueil']);
              this.authService.getUserConnected(decodedToken.username).subscribe(
                (res) => {
                  localStorage.setItem('connectedUser', JSON.stringify(res['hydra:member'][0]));
                  //const roles: string[] = decodedToken.roles;
                }
              )
            }
            if (roles.includes('ROLE_CONTROLEUR') || roles.includes('ROLE_ASSISTANTE')){
              this.router.navigate(['/container/courier']);
              this.authService.getUserConnected(decodedToken.username).subscribe(
                (res) => {
                  localStorage.setItem('connectedUser',res['hydra:member'][0]);
                  //const roles: string[] = decodedToken.roles;
                }
              )
            }
        },
        (error) => {
          if (error.status === 500 || error.status === 0) {
            this.erreur = 'Erreur. Veillez resseyer svp.';
            this.sending = false;
            this.btnText = 'Connexion';
            return;
          }
          else{
          this.sending = false;
          this.btnText = 'Connexion';
          this.erreur = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
        }
      )
  }
}

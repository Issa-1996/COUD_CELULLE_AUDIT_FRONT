import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css'],
})
export class ProfilUserComponent implements OnInit {
  addForm: FormGroup;
  dataUpdate: UserModel;
  helper = new JwtHelperService();
  myProfil: UserModel;
  dataUserUpdate: UserModel;
  erreurusername = '';
  erreurnom = '';
  erreurprenom = '';
  erreurpassword = '';
  erreurconf = '';
  erreuremail = '';
  erreur = '';
  success = '';
  today = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private authServive: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.addForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required]],
      password: [''],
      conf: [''],
    });
    this.addForm.get('username').valueChanges.subscribe(() => {
      this.erreurusername = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('nom').valueChanges.subscribe(() => {
      this.erreurnom = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('prenom').valueChanges.subscribe(() => {
      this.erreurprenom = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('email').valueChanges.subscribe(() => {
      this.erreuremail = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('password').valueChanges.subscribe(() => {
      this.erreurpassword = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('conf').valueChanges.subscribe(() => {
      this.erreurpassword = '';
      this.erreur = '';
      this.success = '';
    });
    this.authServive.getUserConnected(username).subscribe((data) => {
      this.dataUpdate = data['hydra:member'][0];
      this.addForm.patchValue(this.dataUpdate);
    });
  }

  onUpdate(): any {
    if (this.addForm.get('username').value.trim() === '') {
      this.erreurusername = 'Nom utilisateur  obligatoire !';
    }
    if (this.addForm.get('nom').value.trim() === '') {
      this.erreurnom = 'Nom obligatoire !';
    }
    if (this.addForm.get('prenom').value.trim() === '') {
      this.erreurprenom = 'Prenom obligatoire !';
    }
    if (this.addForm.get('email').value.trim() === '') {
      this.erreuremail = 'E-mail obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    if (
      this.addForm.get('password').value.trim() != '' ||
      this.addForm.get('conf').value.trim() != ''
    ) {
      if (
        this.addForm.get('password').value.trim() !=
        this.addForm.get('conf').value.trim()
      ) {
        this.erreurpassword = 'Les mdp doit etre identique';
      } else {
        this.methodeService.updateUsers(this.addForm.value).subscribe(
          (data) => {
            this.erreur = '';
            this.success = 'UTILISATEUR MODIFIER AVEC SUCCESS';
            this.router.navigate(['/']);
          },
          (error) => {
            // @ts-ignore
            if (error.status === 403) {
              this.erreur = error.error;
            } else {
              this.success = '';
              this.erreur = "UNE ERREUR S'EST PRODUITE !";
            }
          }
        );
      }
    } else {
      this.dataUpdate.email = this.addForm.get('email').value;
      this.dataUpdate.prenom = this.addForm.get('prenom').value;
      this.dataUpdate.nom = this.addForm.get('nom').value;
      this.dataUpdate.username = this.addForm.get('username').value;
      this.dataUpdate.profil = null;
      this.methodeService.updateUsers(this.dataUpdate).subscribe(
        (data) => {
          this.erreur = '';
          this.success = 'UTILISATEUR MODIFIER AVEC SUCCESS';
          this.router.navigate(['/']);
        },
        (error) => {
          // @ts-ignore
          if (error.status === 403) {
            this.erreur = error.error;
          } else {
            this.success = '';
            this.erreur = "UNE ERREUR S'EST PRODUITE !";
          }
        }
      );
    }
  }
}

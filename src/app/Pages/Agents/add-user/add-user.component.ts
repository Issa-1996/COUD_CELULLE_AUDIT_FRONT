import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;

  erreurusername = '';
  erreurpassword='';
  erreurroles = '';
  erreurmatricule = '';
  erreurnom = '';
  erreurprenom = '';
  erreurdateDeNaissance='';
  erreurprofil='';
  erreuremail='';
  erreur = '';
  code = '';
  sending = false;
  btnText = 'Envoyer';
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private methodeService: MethodeService
    ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      //roles: ['', Validators.required],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required]],
      dateDeNaissance: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.addForm.get('username').valueChanges.subscribe(
      () => { this.erreurusername = ''; this.erreur = ''; }
    );
    this.addForm.get('password').valueChanges.subscribe(
      () => { this.erreurpassword = ''; this.erreur = ''; }
    );
    // this.addForm.get('roles').valueChanges.subscribe(
    //   () => { this.erreurroles = ''; this.erreur = ''; }
    // );
    this.addForm.get('matricule').valueChanges.subscribe(
      () => { this.erreurmatricule = ''; this.erreur = ''; }
    );
    this.addForm.get('nom').valueChanges.subscribe(
      () => { this.erreurnom = ''; this.erreur = ''; }
    );
    this.addForm.get('prenom').valueChanges.subscribe(
      () => { this.erreurprenom = ''; this.erreur = ''; }
    );
    this.addForm.get('dateDeNaissance').valueChanges.subscribe(
      () => { this.erreurdateDeNaissance = ''; this.erreur = ''; }
    );
    this.addForm.get('email').valueChanges.subscribe(
      () => { this.erreuremail = ''; this.erreur = ''; }
    );
  }

  onSignIn(): any{
    if (this.addForm.get('username').value.trim() === ''){
      this.erreurusername = 'username obligatoire !';
    }
    if (this.addForm.get('password').value.trim() === ''){
      this.erreurpassword = 'Password obligatoire !';
    }
    // if (this.addForm.get('roles').value.trim() === ''){
    //   this.erreurroles = 'Roles obligatoire !';
    // }
    if (this.addForm.get('matricule').value.trim() === ''){
      this.erreurmatricule = 'Matricule obligatoire !';
    }
    if (this.addForm.get('nom').value.trim() === ''){
      this.erreurnom = 'Nom obligatoire !';
    }
    if (this.addForm.get('prenom').value.trim() === ''){
      this.erreurprenom = 'Prenom obligatoire !';
    }
    if (this.addForm.get('dateDeNaissance').value.trim() === ''){
      this.erreurdateDeNaissance = 'Date De Naissance obligatoire !';
    }
    if (this.addForm.get('email').value.trim() === ''){
      this.erreuremail = 'E-mail obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.sending = true;
    this.btnText = 'Vérification...';
    this.subscribeUser(this.addForm.value);
  }
  subscribeUser(objetUser: any){
    this.methodeService.addUser(objetUser)
      .subscribe(
        (data) => {
        this.erreur = 'Ajout utilisateur avec success';
        //this.router.navigate(['/']);
      },
      (error) => {
        // @ts-ignore
        if (error.status === 403){
          this.erreur = error.error;
        }
        else{
          this.erreur = 'Une erreur est produite !';
        }
        this.sending = false;
        this.btnText = 'Envoyer';
        return;
      });
  }

}

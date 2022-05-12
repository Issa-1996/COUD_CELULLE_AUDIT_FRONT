import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilModel } from 'app/Model/Profil.model';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;

  profil:ProfilModel;
  erreurusername = '';
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
    this.getProfilUser();
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      profil: ['', Validators.required],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required]],
      dateDeNaissance: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.addForm.get('username').valueChanges.subscribe(
      () => { this.erreurusername = ''; this.erreur = ''; }
    );
    this.addForm.get('roles').valueChanges.subscribe(
      () => { this.erreurprofil = ''; this.erreur = ''; }
    );
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
    if (this.addForm.get('profil').value.trim() === ''){
      this.erreurprofil = 'Profil obligatoire !';
    }
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
    if(this.addForm.get('profil').value=="1"){  
      this.addForm.addControl("roles",new FormControl(["ROLE_COORDONATEUR"],));
      this.addForm.addControl("password",new FormControl('password',));
      
      
      this.methodeService.addUser(this.addForm.value).subscribe(
        (data) => {
          this.erreur = 'Ajout coordonateur avec success';
          this.router.navigate(['/container/utilisateurs']); 
        },(error) => {
          // @ts-ignore
          if (error.status === 403){this.erreur = error.error;}
          else{this.erreur = 'Une erreur est produite !';}});
    }else if(this.addForm.get('profil').value=="2"){
      this.addForm.addControl("roles",new FormControl(["ROLE_CONTROLEUR"],));
      this.addForm.addControl("password",new FormControl('password',));
      this.methodeService.addUser(this.addForm.value).subscribe(
        (data) => {
          this.erreur = 'Ajout controleur avec success';
          this.router.navigate(['/container/utilisateurs']); 
        },(error) => {
          // @ts-ignore
          if (error.status === 403){this.erreur = error.error;}
          else{this.erreur = 'Une erreur est produite !';}});
    }else if(this.addForm.get('profil').value=="3"){
      this.addForm.addControl("roles",new FormControl(["ROLE_ASSISTANTE"],));
      this.addForm.addControl("password",new FormControl('password',));
      this.methodeService.addUser(this.addForm.value).subscribe(
        (data) => {
          this.erreur = 'Ajout assistante avec success';
          this.router.navigate(['/container/utilisateurs']); 
        },(error) => {
          // @ts-ignore
          if (error.status === 403){this.erreur = error.error;}
          else{this.erreur = 'Une erreur est produite !';}});
    }else if(this.addForm.get('profil').value=="/api/coud/profils/4"){
      this.addForm.addControl("roles",new FormControl(["ROLE_ADJOINT_COORDONATEUR"],));
      this.addForm.addControl("password",new FormControl('password',));
      this.methodeService.addUser(this.addForm.value).subscribe(
        (data) => {
          this.erreur = 'Ajout adjoint coordonateur avec success';
          this.router.navigate(['/container/utilisateurs']); 
        },(error) => {
          // @ts-ignore
          if (error.status === 403){this.erreur = error.error;}
          else{this.erreur = 'Une erreur est produite !';}});
    }
  }
  getProfilUser(): any{
    this.methodeService.getProfils().subscribe(
      (data) => {
        this.profil=data['hydra:member'];
      },
      (error: any) => {
        // console.log(error.message);
    });
  }
}

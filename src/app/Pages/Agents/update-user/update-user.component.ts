import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfilModel } from 'app/Model/Profil.model';
import { UserModel } from 'app/Model/User.model';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { Router } from 'express';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  addForm: FormGroup;

  profil: ProfilModel;
  dataUserUpdate: UserModel;
  erreurusername = '';
  erreurmatricule = '';
  erreurnom = '';
  erreurprenom = '';
  erreurdateDeNaissance = '';
  erreurprofil = '';
  erreuremail = '';
  erreur = '';
  success = '';
  today = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {
    this.dataUserUpdate = this.transferData.getData();
    this.getProfilUser();
    this.addForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      profil: [''],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required]],
      dateDeNaissance: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.addForm.get('username').valueChanges.subscribe(() => {
      this.erreurusername = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('matricule').valueChanges.subscribe(() => {
      this.erreurmatricule = '';
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
    this.addForm.get('dateDeNaissance').valueChanges.subscribe(() => {
      this.erreurdateDeNaissance = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('email').valueChanges.subscribe(() => {
      this.erreuremail = '';
      this.erreur = '';
      this.success = '';
    });
    // this.addForm.get('profil').valueChanges.subscribe(() => {
    //   this.erreurprofil = '';
    //   this.erreur = '';
    //   this.success = '';
    // });
    this.addForm.patchValue(this.dataUserUpdate);
    console.log(this.dataUserUpdate);
  }

  onUpdate(): any {
    if (this.addForm.get('username').value.trim() === '') {
      this.erreurusername = 'Nom utilisateur  obligatoire !';
    }
    // if (this.addForm.get('profil').value.trim() === '') {
    //   this.erreurprofil = 'Profil obligatoire !';
    // }
    if (this.addForm.get('matricule').value.trim() === '') {
      this.erreurmatricule = 'Matricule obligatoire !';
    }
    if (this.addForm.get('nom').value.trim() === '') {
      this.erreurnom = 'Nom obligatoire !';
    }
    if (this.addForm.get('prenom').value.trim() === '') {
      this.erreurprenom = 'Prenom obligatoire !';
    }
    if (this.addForm.get('dateDeNaissance').value.trim() === '') {
      this.erreurdateDeNaissance = 'Date De Naissance obligatoire !';
    }
    if (this.addForm.get('email').value.trim() === '') {
      this.erreuremail = 'E-mail obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    if (this.addForm.get('profil').value == '/api/coud/profils/3') {
      this.addForm.addControl('roles', new FormControl(['ROLE_COORDINATEUR']));
      this.addForm.addControl('password', new FormControl('password'));
      this.methodeService.updateCoordonateur(this.addForm.value).subscribe(
        (data) => {
          console.log(data);          
          this.erreur = '';
          this.success = 'MODIFIER  COORDONATEUR AVEC SUCCESS !';
        },
        (error) => {
          // @ts-ignore
          if (error.status === 403) {
            this.erreur = error.error;
          } else {
            this.success = '';
            this.erreur = " UNE ERREUR S'EST PRODUITE !";
          }
        }
      );
    } else if (this.addForm.get('profil').value == '/api/coud/profils/2') {
      this.addForm.addControl('roles', new FormControl(['ROLE_CONTROLEURS']));
      this.addForm.addControl('password', new FormControl('password'));
      this.methodeService.updateControleur(this.addForm.value).subscribe(
        (data) => {
          console.log(data);          
          this.erreur = '';
          this.success = 'MODIFIER CONTROLEUR AVEC SUCCESS';
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
    } else if (this.addForm.get('profil').value == '/api/coud/profils/1') {
      this.addForm.addControl('roles', new FormControl(['ROLE_ASSISTANTE']));
      this.addForm.addControl('password', new FormControl('password'));
      this.methodeService.updateAssistante(this.addForm.value).subscribe(
        (data) => {
          console.log(data);          
          this.erreur = '';
          this.success = 'MODIFIER ASSISTANTE AVEC  SUCCESS !';
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
  getProfilUser(): any {
    this.methodeService.getProfils().subscribe(
      (data) => {
        this.profil = data['hydra:member'];
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
}

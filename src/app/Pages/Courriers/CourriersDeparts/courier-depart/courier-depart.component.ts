import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TempoData } from 'app/Service/tempoData.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-courier-depart',
  templateUrl: './courier-depart.component.html',
  styleUrls: ['./courier-depart.component.css'],
})
export class CourierDepartComponent implements OnInit {
  addForm: FormGroup;
  erreurdateDepart = '';
  erreurnumeroArchive = '';
  erreurobservation = '';
  erreurnumeroOrdre = '';
  erreurnombrePiece = '';
  erreurnumeroCourier = '';
  erreurobject = '';
  erreur = '';
  success = '';
  erreurNumeroFacture = '';
  erreurmontant = '';
  erreurdestinataire = '';
  courrierArriverArchiver: CourierModel;
  assistante: UserModel;
  helper = new JwtHelperService();
  Connecter: UserModel;
  courrierArrier: any;

  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private transferData: TransferDataService,
    private searchVS: SearchService
  ) {}

  ngOnInit(): void {
    this.courrierArrier = this.transferData.getData();
    this.getAssistante();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      destinataire: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      numeroCompte: ['', Validators.required],
      dateDepart: ['', Validators.required],
      observation: ['', [Validators.required]],
      NumeroFacture: ['', Validators.required],
      montant: ['', Validators.required],
      controleurs: ['', Validators.required],
      coordonateur: ['', Validators.required],
      assistante: ['', Validators.required],
    });
    this.addForm.get('dateDepart').valueChanges.subscribe(() => {
      this.erreurdateDepart = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('observation').valueChanges.subscribe(() => {
      this.erreurobservation = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.patchValue(this.courrierArrier);
  }

  onSignIn(): any {
    if (this.addForm.get('dateDepart').value.trim() === '') {
      this.erreurdateDepart = 'Date Depart obligatoire !';
    }
    if (this.addForm.get('observation').value.trim() === '') {
      this.erreurobservation = 'Observation obligatoire !';
    }
    this.addForm.addControl(
      'numeroDepart',
      new FormControl(this.addForm.get('numeroCourier').value)
    );
    if (this.addForm.invalid) {
      return;
    }
    if (this.courrierArrier.ficheDeControle.avisControleur == 'RAS') {
      this.addForm.addControl('type', new FormControl('RAS'));
    } else if (this.courrierArrier.ficheDeControle.avisControleur == 'REJET') {
      this.addForm.addControl('type', new FormControl('REJET'));
    }    
    this.subscribeCourierDepart(this.addForm.value);
  }
  subscribeCourierDepart(objetCourierDepart: any) {
    this.methodeService.addCourierDepart(objetCourierDepart).subscribe(
      (data) => {  
        this.courrierArrier.etat = '1';
        this.updateCourierArriver(this.courrierArrier);
        this.erreur = '';
        this.success = 'COURRIER DEPART AVEC SUCCESS ';
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

  updateCourierArriver(objetCourierArriver: any) {
    this.methodeService
      .updateCourrierArriver(objetCourierArriver)
      .subscribe((data) => {
        this.newValue(data);
      });
  }

  getAssistante(): any {
    this.methodeService.getAssistantes().subscribe(
      (data) => {
        this.assistante = data['hydra:member'][0]['id'];
      },
      (error: any) => {}
    );
  }

  connectUser() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.methodeService
      .getCoordonateursByUsername(decodedToken.username)
      .subscribe((data) => {
        this.Connecter = data['hydra:member'][0]['id'];
      });
  }

  newValue(search) {
    this.searchVS.changeValue(search);
  }
}

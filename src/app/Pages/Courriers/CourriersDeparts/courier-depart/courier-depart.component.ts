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
  erreurdestination = '';
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
  erreurbeneficiaire = '';
  courrierArriverArchiver: CourierModel;
  assistante: UserModel;
  helper = new JwtHelperService();
  Connecter: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private dataDepot: TempoData,
    private transferData: TransferDataService,
    private searchVS: SearchService
  ) {}

  ngOnInit(): void {
    this.getAssistante();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      beneficiaire: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      Date: ['', Validators.required],
      destination: ['', Validators.required],
      observation: ['', [Validators.required]],
      numeroArchive: ['', Validators.required],
      nombrePiece: ['', Validators.required],
      numeroOrdre: ['', Validators.required],
      NumeroFacture: ['', Validators.required],
      montant: ['', Validators.required],
    });
    this.addForm.get('object').valueChanges.subscribe(() => {
      this.erreurobject = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('beneficiaire').valueChanges.subscribe(() => {
      this.erreurbeneficiaire = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroCourier').valueChanges.subscribe(() => {
      this.erreurnumeroCourier = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('Date').valueChanges.subscribe(() => {
      this.erreurdateDepart = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('destination').valueChanges.subscribe(() => {
      this.erreurdestination = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('observation').valueChanges.subscribe(() => {
      this.erreurobservation = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroArchive').valueChanges.subscribe(() => {
      this.erreurnumeroArchive = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('nombrePiece').valueChanges.subscribe(() => {
      this.erreurnombrePiece = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroOrdre').valueChanges.subscribe(() => {
      this.erreurnumeroOrdre = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('NumeroFacture').valueChanges.subscribe(() => {
      this.erreurnombrePiece = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('montant').valueChanges.subscribe(() => {
      this.erreurnumeroOrdre = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.patchValue(this.transferData.getData());
  }

  onSignIn(): any {
    if (this.addForm.get('object').value.trim() === '') {
      this.erreurobject = 'Objet obligatoire !';
    }
    if (this.addForm.get('numeroCourier').value.trim() === '') {
      this.erreurnumeroCourier = 'Numero courier obligatoire !';
    }
    if (this.addForm.get('Date').value.trim() === '') {
      this.erreurdateDepart = 'Date départ obligatoire !';
    }
    if (this.addForm.get('destination').value.trim() === '') {
      this.erreurdestination = 'Destination obligatoire !';
    }
    if (this.addForm.get('observation').value.trim() === '') {
      this.erreurobservation = 'Observation obligatoire !';
    }
    if (this.addForm.get('numeroArchive').value.trim() === '') {
      this.erreurnumeroArchive = 'Numero archive obligatoire !';
    }
    if (this.addForm.get('nombrePiece').value.trim() === '') {
      this.erreurnombrePiece = 'Nombre Piece obligatoire !';
    }
    if (this.addForm.get('numeroOrdre').value.trim() === '') {
      this.erreurnumeroOrdre = 'Numero ordre obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    this.addForm.addControl(
      'assistante',
      new FormControl('/api/coud/assistantes/' + this.assistante)
    );
    this.addForm.addControl(
      'coordinateur',
      new FormControl('/api/coud/coordinateurs/' + this.Connecter)
    );
    this.courrierArriverArchiver = this.dataDepot['data'];
    this.courrierArriverArchiver.etat = '1';
    // console.log(this.courrierArriverArchiver);
    
    this.updateCourierArriver(this.courrierArriverArchiver);
    this.subscribeCourierDepart(this.addForm.value);
  }
  subscribeCourierDepart(objetCourierDepart: any) {
    this.methodeService.addCourierDepart(objetCourierDepart).subscribe(
      (data) => {
        this.erreur = '';
        this.success = 'COURRIER VALIDER COME DEPART AVEC SUCCESS ';
        // this.router.navigate(['/']);
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

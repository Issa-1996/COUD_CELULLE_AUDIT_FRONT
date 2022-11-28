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
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';

@Component({
  selector: 'app-courier-arriver',
  templateUrl: './courier-arriver.component.html',
  styleUrls: ['./courier-arriver.component.css'],
})
export class CourierArriverComponent implements OnInit {
  addForm: FormGroup;

  helper = new JwtHelperService();
  controleur: UserModel;
  coordonateur: UserModel;
  assistante: UserModel;
  erreurdateArriver = '';
  erreurexpediteur = '';
  erreurdateCorrespondance = '';
  erreurnumeroCorrespondance = '';
  erreurdateReponse = '';
  erreurnumeroReponse = '';
  erreurnumeroCourier = '';
  erreurnumeroCompte = '';
  erreurobject = '';
  erreurControleur = ' ';
  erreurMontant = '';
  erreurFacture = '';
  erreurdestinataire = '';
  erreurtypeDeCourrier = '';
  erreur = '';
  success = '';
  ConnecterAssistante: UserModel;
  ConnecterCoordinateur: UserModel;
  id: number;
  object: String;
  search: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private methodeService: MethodeService,
    private authService: AuthService,
    private searchVS: SearchService
  ) {}

  ngOnInit(): void {
    this.connectUser();
    this.getAssistante();
    this.getCoordonateur();
    this.getControleurs();
    this.searchVS.currentSearch.subscribe((search) => (this.search = search));
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      destinataire: ['', Validators.required],
      NumeroFacture: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      numeroCompte: ['', Validators.required],
      montant: ['', Validators.required],
      typeDeCourrier: ['', Validators.required],
      dateArriver: ['', Validators.required],
      expediteur: ['', Validators.required],
      controleurs: ['', Validators.required],
    });
    this.addForm.get('object').valueChanges.subscribe(() => {
      this.erreurobject = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('typeDeCourrier').valueChanges.subscribe(() => {
      this.erreurtypeDeCourrier = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('destinataire').valueChanges.subscribe(() => {
      this.erreurdestinataire = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('NumeroFacture').valueChanges.subscribe(() => {
      this.erreurFacture = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('montant').valueChanges.subscribe(() => {
      this.erreurMontant = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroCourier').valueChanges.subscribe(() => {
      this.erreurnumeroCourier = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroCompte').valueChanges.subscribe(() => {
      this.erreurnumeroCompte = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('dateArriver').valueChanges.subscribe(() => {
      this.erreurdateArriver = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('expediteur').valueChanges.subscribe(() => {
      this.erreurexpediteur = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('controleurs').valueChanges.subscribe(() => {
      this.erreurControleur = '';
      this.erreur = '';
      this.success = '';
    });
  }

  onSignIn(): any {
    if (this.addForm.get('object').value.trim() === '') {
      this.erreurobject = 'Objet obligatoire !';
    }
    if (this.addForm.get('typeDeCourrier').value.trim() === '') {
      this.erreurtypeDeCourrier = 'Type courrier obligatoire !';
    }
    if (this.addForm.get('destinataire').value.trim() === '') {
      this.erreurdestinataire = 'Destinataire obligatoire !';
    }
    if (this.addForm.get('NumeroFacture').value.trim() === '') {
      this.erreurFacture = 'Numero facture obligatoire !';
    }
    if (this.addForm.get('montant').value.trim() === '') {
      this.erreurMontant = 'Montant obligatoire !';
    }
    if (this.addForm.get('numeroCourier').value.trim() === '') {
      this.erreurnumeroCourier = 'Numero Courier obligatoire !';
    }
    if (this.addForm.get('numeroCompte').value.trim() === '') {
      this.erreurnumeroCompte = 'Numero Compte obligatoire !';
    }
    if (this.addForm.get('dateArriver').value.trim() === '') {
      this.erreurdateArriver = 'Date Arriver obligatoire !';
    }
    if (this.addForm.get('expediteur').value.trim() === '') {
      this.erreurexpediteur = 'Expediteur obligatoire !';
    }
    if (this.addForm.get('controleurs').value.trim() === '') {
      this.erreurControleur = 'Controleur obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    this.addForm.addControl(
      'numeroArriver',
      new FormControl(this.addForm.get('numeroCourier').value)
    );
    this.addForm.addControl('etat', new FormControl('0'));
    this.addForm.addControl('statut', new FormControl('0'));
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    if (decodedToken.roles.includes('ASSISTANTE')) {
      this.addForm.addControl(
        'assistante',
        new FormControl('/api/coud/assistantes/' + this.ConnecterAssistante)
      );
      this.addForm.addControl(
        'coordinateur',
        new FormControl('/api/coud/coordinateurs/' + this.coordonateur)
      );
    }
    this.subscribeCourierArriver(this.addForm.value);
  }
  subscribeCourierArriver(objetCourierArriver: CourierModel) {
    this.methodeService.addCourierArriver(objetCourierArriver).subscribe(
      (data) => {
        this.newValue(data);
        this.erreur = '';
        this.success = 'NOUVEAU COURRIER ARRIVER AVEC SUCCESS';
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
  getControleurs(): any {
    this.methodeService.getControleurs().subscribe(
      (data) => {
        this.controleur = data['hydra:member'];
      },
      (error: any) => {}
    );
  }
  getCoordonateur(): any {
    this.methodeService.getCoordonateurs().subscribe(
      (data) => {
        this.coordonateur = data['hydra:member'][0]['id'];
      },
      (error: any) => {}
    );
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
    if (decodedToken.roles.includes('ASSISTANTE')) {
      this.methodeService
        .getAssistanteByUsername(decodedToken.username)
        .subscribe((data) => {
          this.ConnecterAssistante = data['hydra:member'][0]['id'];
        });
    }
    if (decodedToken.roles.includes('COORDONATEUR')) {
      this.methodeService
        .getCoordonateursByUsername(decodedToken.username)
        .subscribe((data) => {
          this.ConnecterCoordinateur = data['hydra:member'][0]['id'];
        });
    }
  }
  newValue(search) {
    this.searchVS.changeValue(search);
  }
}

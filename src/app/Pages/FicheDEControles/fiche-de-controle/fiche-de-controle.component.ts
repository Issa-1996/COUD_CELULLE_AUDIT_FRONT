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
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TempoData } from 'app/Service/tempoData.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-fiche-de-controle',
  templateUrl: './fiche-de-controle.component.html',
  styleUrls: ['./fiche-de-controle.component.css'],
})
export class FicheDeControleComponent implements OnInit {
  addForm: FormGroup;
  helper = new JwtHelperService();
  erreurobjet = '';
  erreuravisControleur = '';
  erreurmotivation = '';
  erreurrecommandations = '';
  erreur = '';
  success = '';
  objetCourier: CourierModel[];
  tabObjet = [];
  coordonateur: UserModel;
  user: UserModel;
  controleurConnect: UserModel;
  search: string;
  courrierArriverStatut: any;
  hiddenInput = 'false';
  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private authService: AuthService,
    private searchVS: SearchService,
    private transferdata: TransferDataService
  ) {}

  ngOnInit(): void {      
    this.connectUser();
    this.courrierArriverStatut = this.transferdata.getData();
    this.searchVS.currentSearch.subscribe((search) => (this.search = search));
    this.getCoordonateur();
    this.addForm = this.formBuilder.group({
      objet: [this.courrierArriverStatut.object, Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', Validators.required],
    });
    this.addForm.get('objet').valueChanges.subscribe(() => {
      this.erreurobjet = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('avisControleur').valueChanges.subscribe(() => {
      if (this.addForm.get('avisControleur').value.trim() === 'REJET') {
        this.hiddenInput = 'true';
      } else if (this.addForm.get('avisControleur').value.trim() === 'RAS') {
        this.hiddenInput = 'false';
      }
      this.erreuravisControleur = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('motivation').valueChanges.subscribe(() => {
      this.erreurmotivation = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('recommandations').valueChanges.subscribe(() => {
      this.erreurrecommandations = '';
      this.erreur = '';
      this.success = '';
    });
  }

  onSignIn(): any {
    if (this.addForm.get('objet').value.trim() === '') {
      this.erreurobjet = 'Objet obligatoire !';
    }
    if (this.addForm.get('avisControleur').value.trim() === '') {
      this.erreuravisControleur = 'Avis controleur obligatoire !';
    }
    this.addForm.addControl(
      'controleurs',
      new FormControl('/api/coud/controleurs/' + this.user)
    );
    this.addForm.addControl(
      'coordonateur',
      new FormControl('/api/coud/coordonateurs/' + this.coordonateur)
    );
    this.addForm.addControl(
      'courrierArriver',
      new FormControl(
        '/api/coud/courier_arrivers/' + this.courrierArriverStatut.id
      )
    );
    this.addForm.addControl(
      'nomControleur',
      new FormControl(this.controleurConnect.prenom+' '+this.controleurConnect.nom)
    );
    if (this.addForm.get('avisControleur').value.trim() === 'RAS') {
      this.addForm.addControl('motivation', new FormControl(' '));
      this.addForm.addControl('recommandations', new FormControl(' '));
      this.subscribeFicheDeControle(this.addForm.value);
    } else if (this.addForm.get('avisControleur').value.trim() === 'REJET') {
      if (this.addForm.get('motivation').value.trim() === '') {
        this.erreurmotivation = 'Motivation obligatoire !';
      }
      if (this.addForm.get('recommandations').value.trim() === '') {
        this.erreurrecommandations = 'Recommandation obligatoire !';
      }
      if (
        this.addForm.get('motivation').value.trim() != '' ||
        this.addForm.get('recommandations').value.trim() != ''
      ) {
        this.subscribeFicheDeControle(this.addForm.value);
      }
    }
    if (this.addForm.invalid) {
      return;
    }
  }
  subscribeFicheDeControle(objetFicheDeControle: any) {
    this.methodeService.addFicheDeControle(objetFicheDeControle).subscribe(
      (data) => {
        this.courrierArriverStatut.ficheDeControle = data;
        this.courrierArriverStatut.statut = '1';
        this.updateCourierArriver(this.courrierArriverStatut);
        this.erreur = '';
        this.success = 'AJOUT FICHE DE CONTROLE  AVEC SUCCESS';
      },
      (error) => {
        this.erreur = "UNE ERREUR S'EST PRODUITE !";
        this.success = '';
      }
    );
  }

  connectUser() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authService.getUserConnected(username).subscribe((data) => {
      this.controleurConnect=data['hydra:member'][0];
      this.user = data['hydra:member'][0]['id'];      
      for (
        let i = 0;
        i < data['hydra:member'][0]['courrier'].length;
        i++
      ) {
        if(data['hydra:member'][0]['courrier'][i]["@type"]=="CourierArriver"){
          if((data['hydra:member'][0]['courrier'][i].etat==0) && data['hydra:member'][0]['courrier'][i].statut==0){
            // console.log(data['hydra:member'][0]['courrier'][i]);
            if (
              data['hydra:member'][0]['courrier'][i]['ficheDeControle'] ==
              null
            ) {
              this.tabObjet[i] = data['hydra:member'][0]['courrier'][i];
            }
          }          
        }
      }
      this.objetCourier = this.tabObjet.filter(function (el) {
        return el != null;
      });
    });
  }
  getCoordonateur(): any {
    this.methodeService.getCoordonateurs().subscribe(
      (data) => {
        this.coordonateur = data['hydra:member'][0]['id'];
      },
      (error: any) => {}
    );
  }

  updateCourierArriver(objetCourierArriver: any) {
    this.methodeService
      .updateCourrierArriver(objetCourierArriver)
      .subscribe((data) => {
        this.newValue(data);
      });
  }

  newValue(search) {
    this.searchVS.changeValue(search);
  }
}

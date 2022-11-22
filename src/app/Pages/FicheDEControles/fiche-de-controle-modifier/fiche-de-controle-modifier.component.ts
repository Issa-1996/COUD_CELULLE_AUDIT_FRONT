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
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-fiche-de-controle-modifier',
  templateUrl: './fiche-de-controle-modifier.component.html',
  styleUrls: ['./fiche-de-controle-modifier.component.css'],
})
export class FicheDeControleModifierComponent implements OnInit {
  addForm: FormGroup;
  helper = new JwtHelperService();
  erreurobjet = '';
  erreuravisControleur = '';
  erreurmotivation = '';
  erreurrecommandations = '';
  erreurCourrier = '';
  erreur = '';
  success = '';
  objetCourier: CourierModel[];
  tabObjet = [];
  coordonateur: UserModel;
  user: UserModel;
  search: string;
  hiddenInput = 'false';
  ficheModifier: FicheDeControlModel;
  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private authService: AuthService,
    private searchVS: SearchService,
    private transferdata: TransferDataService
  ) {}

  ngOnInit(): void {    
    this.ficheModifier=this.transferdata.getData().ficheDeControle;    
    this.searchVS.currentSearch.subscribe((search) => (this.search = search));
    this.getCoordonateur();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      id: [''],
      objet: ['', Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', [Validators.required]],
    });
    this.addForm.get('objet').valueChanges.subscribe(() => {
      this.erreurobjet = '';
      this.erreur = '';
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
    this.addForm.patchValue(this.ficheModifier);
  }

  onSignIn(): any {
    if (this.addForm.get('objet').value.trim() === '') {
      this.erreurobjet = 'Objet obligatoire !';
    }
    if (this.addForm.get('avisControleur').value.trim() === '') {
      this.erreuravisControleur = 'Avis controleur obligatoire !';
    }
    if (this.addForm.get('motivation').value.trim() === '') {
      this.erreurmotivation = 'Motivation obligatoire !';
    }
    if (this.addForm.get('recommandations').value.trim() === '') {
      this.erreurrecommandations = 'Recommandation obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }    
    this.subscribeFicheDeControle(this.addForm.value);
  }
  subscribeFicheDeControle(objetFicheDeControle: any) {
    this.methodeService.updateFicheDeControle(objetFicheDeControle).subscribe(
      (data) => {
        this.success = 'Fiche de control Modifier avec success';
        this.newValue(data);
        // this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 403) {
          this.erreur = error.error;
        } else {
          this.erreur = "Une erreur s'est produite !";
        }
      }
    );
  }
  connectUser() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authService.getUserConnected(username).subscribe((data) => {
      if (data['hydra:member'][0]['roles'].includes('ROLE_COORDONATEUR')) {
        this.methodeService
          .getCoordonateursByUsername(data['hydra:member'][0]['username'])
          .subscribe((coord) => {
            this.user = coord['hydra:member'][0]['courier'];
            for (
              let i = 0;
              i < coord['hydra:member'][0]['courier'].length;
              i++
            ) {
              if (
                coord['hydra:member'][0]['courier'][i]['@type'] ==
                'CourierArriver'
              ) {
                if (
                  coord['hydra:member'][0]['courier'][i]['ficheDeControle'] ==
                  null
                ) {
                  this.tabObjet[i] = coord['hydra:member'][0]['courier'][i];
                }
              }
            }
            this.objetCourier = this.tabObjet.filter(function (el) {
              return el != null;
            });
          });
      } else if (
        data['hydra:member'][0]['roles'].includes('ROLE_CONTROLEUR')
      ) {
        this.methodeService
          .getControleursByUsername(data['hydra:member'][0]['username'])
          .subscribe((coord) => {
            this.user = coord['hydra:member'][0]['courierArrivers'];
            for (
              let i = 0;
              i < coord['hydra:member'][0]['courierArrivers'].length;
              i++
            ) {
              if (
                coord['hydra:member'][0]['courierArrivers'][i][
                  'ficheDeControle'
                ] == null
              ) {
                this.tabObjet[i] = coord['hydra:member'][0]['courierArrivers'][i];
              }
            }
            this.objetCourier = this.tabObjet.filter(function (el) {
              return el != null;
            });
          });
      }
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
  newValue(search) {
    this.searchVS.changeValue(search);
  }
}

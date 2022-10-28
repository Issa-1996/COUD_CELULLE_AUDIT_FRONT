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
  search: string;
  courrierArriverStatut: CourierModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private methodeService: MethodeService,
    private authService: AuthService,
    private searchVS: SearchService,
    private dataDepot: TempoData,
    private transferdata: TransferDataService
  ) {}

  ngOnInit(): void {
    this.searchVS.currentSearch.subscribe((search) => (this.search = search));
    this.getCoordonateur();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      objet: ['', Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', [Validators.required]],
    });
    this.addForm.get('objet').valueChanges.subscribe(() => {
      this.erreurobjet = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('avisControleur').valueChanges.subscribe(() => {
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
    if (this.addForm.get('motivation').value.trim() === '') {
      this.erreurmotivation = 'Motivation obligatoire !';
    }
    if (this.addForm.get('recommandations').value.trim() === '') {
      this.erreurrecommandations = 'Recommandation obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    this.addForm.addControl(
      'controleurs',
      new FormControl('/api/coud/controleurs/' + this.user)
    );
    this.addForm.addControl(
      'coordinateur',
      new FormControl('/api/coud/coordinateurs/' + this.coordonateur)
    );
    this.addForm.addControl(
      'courrierArriver',
      new FormControl(
        '/api/coud/courier_arrivers/' + this.transferdata.getData().id
      )
    );

    this.courrierArriverStatut = this.dataDepot['data'];
    this.courrierArriverStatut.statut = '1';
    this.updateCourierArriver(this.courrierArriverStatut);

    this.subscribeFicheDeControle(this.addForm.value);
  }
  subscribeFicheDeControle(objetFicheDeControle: any) {
    this.methodeService.addFicheDeControle(objetFicheDeControle).subscribe(
      (data) => {
        this.success = 'Fiche de control avec success';
        //this.router.navigate(['/']);
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
      this.user = data['hydra:member'][0]['id'];
      for (
        let i = 0;
        i < data['hydra:member'][0]['courierArrivers'].length;
        i++
      ) {
        if (
          data['hydra:member'][0]['courierArrivers'][i]['ficheDeControle'] ==
          null
        ) {
          this.tabObjet[i] = data['hydra:member'][0]['courierArrivers'][i];
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

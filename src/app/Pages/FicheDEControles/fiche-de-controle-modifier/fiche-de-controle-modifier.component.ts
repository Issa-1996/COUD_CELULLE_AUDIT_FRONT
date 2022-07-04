import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-fiche-de-controle-modifier',
  templateUrl: './fiche-de-controle-modifier.component.html',
  styleUrls: ['./fiche-de-controle-modifier.component.css']
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
  objetCourier: CourierModel[];
  tabObjet = [];
  coordonateur: UserModel;
  user: UserModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private methodeService: MethodeService,
    private authService: AuthService,
    private behavio: BehavioSubjetService
  ) {}

  ngOnInit(): void {
    this.getCoordonateur();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      id: [''],
      objet: ['', Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', [Validators.required]],
      courrierArriver: [''],
    });
    this.addForm.get('objet').valueChanges.subscribe(() => {
      this.erreurobjet = '';
      this.erreur = '';
    });
    this.addForm.get('avisControleur').valueChanges.subscribe(() => {
      this.erreuravisControleur = '';
      this.erreur = '';
    });
    this.addForm.get('motivation').valueChanges.subscribe(() => {
      this.erreurmotivation = '';
      this.erreur = '';
    });
    this.addForm.get('recommandations').valueChanges.subscribe(() => {
      this.erreurrecommandations = '';
      this.erreur = '';
    });
    this.addForm.get('courrierArriver').valueChanges.subscribe(() => {
      this.erreurCourrier = '';
      this.erreur = '';
    });
    this.behavio.getValue().subscribe(
      (data)=>{        
        this.addForm.patchValue(data);
      })
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
    this.subscribeFicheDeControle(this.addForm.value);
  }
  subscribeFicheDeControle(objetFicheDeControle: any) {
    this.methodeService.updateFicheDeControle(objetFicheDeControle).subscribe(
      (data) => {
        this.erreur = 'Fiche de control Modifier avec success';
        this.router.navigate(['/']);
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
}


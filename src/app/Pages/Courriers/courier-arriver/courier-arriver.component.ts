import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Facture } from 'app/Model/Facture.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-courier-arriver',
  templateUrl: './courier-arriver.component.html',
  styleUrls: ['./courier-arriver.component.css']
})
export class CourierArriverComponent implements OnInit {

  addForm: FormGroup;

  helper = new JwtHelperService();
  controleur:UserModel;
  coordonateur:UserModel;
  erreurdateArriver = '';
  erreurexpediteur = '';
  erreurdateCorrespondance = '';
  erreurnumeroCorrespondance = '';
  erreurdateReponse = '';
  erreurnumeroReponse = '';
  erreurnumeroCourier = '';
  erreurobject = '';
  erreurControleur =" ";
  erreurMontant="";
  erreurFacture="";
  erreurBeneficiaire="";
  erreur = '';
  code = '';
  Connecter:UserModel;
  id:number;
  object:String;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private methodeService: MethodeService, 
    private authService: AuthService,
    private bihavio: BehavioSubjetService
    ) { }

  ngOnInit(): void {
    this.getCoordonateur();
    this.connectUser();
    this.getControleurs();
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      beneficiaire: ['', Validators.required],
      NumeroFacture: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      montant: ['', Validators.required],
      Date: ['', Validators.required],
      expediteur: ['', Validators.required],
      numeroCorrespondance: ['', [Validators.required]],
      dateCorrespondance: ['', Validators.required],
      numeroReponse: ['', Validators.required],
      dateReponse: ['', Validators.required],
      controleur: ['', Validators.required]
    });
    this.addForm.get('object').valueChanges.subscribe(
      () => { this.erreurobject = ''; this.erreur = ''; }
    );
    this.addForm.get('beneficiaire').valueChanges.subscribe(
      () => { this.erreurBeneficiaire = ''; this.erreur = ''; }
    );
    this.addForm.get('NumeroFacture').valueChanges.subscribe(
      () => { this.erreurFacture = ''; this.erreur = ''; }
    );
    this.addForm.get('montant').valueChanges.subscribe(
      () => { this.erreurMontant = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroCourier').valueChanges.subscribe(
      () => { this.erreurnumeroCourier = ''; this.erreur = ''; }
    );
    this.addForm.get('Date').valueChanges.subscribe(
      () => { this.erreurdateArriver = ''; this.erreur = ''; }
    );
    this.addForm.get('expediteur').valueChanges.subscribe(
      () => { this.erreurexpediteur = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroCorrespondance').valueChanges.subscribe(
      () => { this.erreurnumeroCorrespondance = ''; this.erreur = ''; }
    );
    this.addForm.get('dateCorrespondance').valueChanges.subscribe(
      () => { this.erreurdateCorrespondance = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroReponse').valueChanges.subscribe(
      () => { this.erreurnumeroReponse = ''; this.erreur = ''; }
    );
    this.addForm.get('dateReponse').valueChanges.subscribe(
      () => { this.erreurdateReponse = ''; this.erreur = ''; }
    );
    this.addForm.get('controleur').valueChanges.subscribe(
      () => { this.erreurControleur = ''; this.erreur = ''; }
    );
  }

  onSignIn(): any{
    if (this.addForm.get('object').value.trim() === ''){
      this.erreurobject = 'Objet obligatoire !';
    }
    if (this.addForm.get('beneficiaire').value.trim() === ''){
      this.erreurBeneficiaire = 'Bénéficiaire obligatoire !';
    }
    if (this.addForm.get('NumeroFacture').value.trim() === ''){
      this.erreurFacture = 'Numero facture obligatoire !';
    }
    if (this.addForm.get('montant').value.trim() === ''){
      this.erreurMontant = 'Montant obligatoire !';
    }
    if (this.addForm.get('numeroCourier').value.trim() === ''){
      this.erreurnumeroCourier = 'Numero Courier obligatoire !';
    }
    if (this.addForm.get('Date').value.trim() === ''){
      this.erreurdateArriver = 'Date Arriver obligatoire !';
    }
    if (this.addForm.get('expediteur').value.trim() === ''){
      this.erreurexpediteur = 'Expediteur obligatoire !';
    }
    if (this.addForm.get('numeroCorrespondance').value.trim() === ''){
      this.erreurnumeroCorrespondance = 'Numero Correspondance obligatoire !';
    }
    if (this.addForm.get('dateCorrespondance').value.trim() === ''){
      this.erreurdateCorrespondance = 'Date Correspondance obligatoire !';
    }
    if (this.addForm.get('numeroReponse').value.trim() === ''){
      this.erreurnumeroReponse = 'Numero Reponse obligatoire !';
    }
    if (this.addForm.get('dateReponse').value.trim() === ''){
      this.erreurdateReponse = 'Date Reponse obligatoire !';
    }
    if (this.addForm.get('controleur').value.trim() === ''){
      this.erreurControleur = 'Controleur obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.addForm.addControl("assistante",new FormControl("/api/coud/assistantes/"+this.Connecter,));
    this.addForm.addControl("coordinateur",new FormControl("/api/coud/coordinateurs/"+this.coordonateur,));
    this.subscribeCourierArriver(this.addForm.value);
    this.bihavio.setValue(this.addForm.value);
  }
  subscribeCourierArriver(objetCourierArriver: any){
    this.methodeService.addCourierArriver(objetCourierArriver)
      .subscribe(
        (data) => {
        this.erreur = 'Courier arriver avec success';
        //this.router.navigate(['/container/courier']);
      },
      (error) => {
        // @ts-ignore
        if (error.status === 403){
          this.erreur = error.error;
        }
        else{
          this.erreur = 'Une erreur s\'est produite !';
        }
      });
  }
  getControleurs(): any{
    this.methodeService.getControleurs().subscribe(
      (data) => {
        this.controleur=data['hydra:member'];
      },
      (error: any) => {
    });
  }
  getCoordonateur(): any{
    this.methodeService.getCoordonateurs().subscribe(
      (data) => {
        this.coordonateur=data['hydra:member'][0]["id"];
      },
      (error: any) => {
    });
  }
  connectUser(){
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authService.getUserConnected(username)
    .subscribe(data=>{
     this.Connecter=data['hydra:member'][0]["id"];
    })
  }
}

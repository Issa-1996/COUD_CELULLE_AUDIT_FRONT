import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'app/Model/User.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-update-courrier',
  templateUrl: './update-courrier.component.html',
  styleUrls: ['./update-courrier.component.css']
})
export class UpdateCourrierComponent implements OnInit {

  addForm: FormGroup;
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
  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private behavio: BehavioSubjetService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id:[''],
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
    this.behavio.getValue().subscribe(
      (data)=>{        
        this.addForm.patchValue(data);
      })
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
    if (this.addForm.invalid){
      return;
    }
    // this.addForm.addControl("assistante",new FormControl("/api/coud/assistantes/"+this.Connecter,));
    // this.addForm.addControl("coordinateur",new FormControl("/api/coud/coordinateurs/"+this.coordonateur,));
   
    this.updateCourierArriver(this.addForm.value);
  }
  updateCourierArriver(objetCourierArriver: any){
    this.behavio.setValue(objetCourierArriver);
    this.methodeService.updateCourrierArriver(objetCourierArriver)
      .subscribe(
        (data) => {
        this.erreur = 'Courier arriver modifier avec success';
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
  start = Date.now();
}

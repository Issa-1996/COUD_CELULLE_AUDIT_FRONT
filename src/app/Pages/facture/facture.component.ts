import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  courrier:CourierModel;
  addForm: FormGroup;
  helper = new JwtHelperService();
  erreurNumFacture = '';
  erreurMontant = '';
  erreurObjet = '';
  erreurBeneficiaire = '';
  erreur = '';
  constructor(private formBuilder: FormBuilder, private methodeService: MethodeService) { }

  ngOnInit(): void {
    this.getCourrierArrivers();
    this.addForm = this.formBuilder.group({
      numeroFacture: ['', Validators.required],
      montant: ['', Validators.required],
      object: ['', Validators.required],
      beneficaire: ['', Validators.required]
    });
    this.addForm.get('numeroFacture').valueChanges.subscribe(
      () => { this.erreurNumFacture = ''; this.erreur = ''; }
    );
    this.addForm.get('montant').valueChanges.subscribe(
      () => { this.erreurMontant = ''; this.erreur = ''; }
    );
    this.addForm.get('object').valueChanges.subscribe(
      () => { this.erreurObjet = ''; this.erreur = ''; }
    );
    this.addForm.get('beneficaire').valueChanges.subscribe(
      () => { this.erreurBeneficiaire = ''; this.erreur = ''; }
    );
  }

  onSignIn(): any{
    if (this.addForm.get('numeroFacture').value.trim() === ''){
      this.erreurNumFacture = 'Numero Facture obligatoire !';
    }
    if (this.addForm.get('montant').value.trim() === ''){
      this.erreurMontant = 'Montant obligatoire !';
    }
    if (this.addForm.get('object').value.trim() === ''){
      this.erreurObjet = 'Objet obligatoire !';
    }
    if (this.addForm.get('beneficaire').value.trim() === ''){
      this.erreurBeneficiaire = 'Bénéficiaire obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.subscribeFacture(this.addForm.value);
  }
  subscribeFacture(objetFacture: any){
    this.methodeService.addFActure(objetFacture)
      .subscribe(
        (data) => {
        this.erreur = 'Facture avec success';
        //this.router.navigate(['/container/courier']);
      },
      (error) => {
        if (error.status === 403){  this.erreur = error.error;  }
        else{ this.erreur = 'Une erreur s\'est produite !'; }
      });
  }


  getCourrierArrivers(): any{
    this.methodeService.getCourriers().subscribe(
      (data) => {
        this.courrier=data['hydra:member'];        
      },
      (error: any) => {
    });
  }
}

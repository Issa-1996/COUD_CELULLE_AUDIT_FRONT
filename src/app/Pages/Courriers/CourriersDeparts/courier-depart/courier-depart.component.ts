import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-courier-depart',
  templateUrl: './courier-depart.component.html',
  styleUrls: ['./courier-depart.component.css']
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
  erreurNumeroFacture="";
  erreurmontant="";
  erreurbeneficiaire="";
  code = '';
  sending = false;
  btnText = 'Envoyer';
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private methodeService: MethodeService,
    private behavio: BehavioSubjetService) { }

  ngOnInit(): void {
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
      assistante: ['', Validators.required],
      coordinateur: ['', Validators.required],
    });
    this.addForm.get('object').valueChanges.subscribe(
      () => { this.erreurobject = ''; this.erreur = ''; }
    );
    this.addForm.get('beneficiaire').valueChanges.subscribe(
      () => { this.erreurbeneficiaire = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroCourier').valueChanges.subscribe(
      () => { this.erreurnumeroCourier = ''; this.erreur = ''; }
    );
    this.addForm.get('Date').valueChanges.subscribe(
      () => { this.erreurdateDepart = ''; this.erreur = ''; }
    );
    this.addForm.get('destination').valueChanges.subscribe(
      () => { this.erreurdestination = ''; this.erreur = ''; }
    );
    this.addForm.get('observation').valueChanges.subscribe(
      () => { this.erreurobservation = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroArchive').valueChanges.subscribe(
      () => { this.erreurnumeroArchive = ''; this.erreur = ''; }
    );
    this.addForm.get('nombrePiece').valueChanges.subscribe(
      () => { this.erreurnombrePiece = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroOrdre').valueChanges.subscribe(
      () => { this.erreurnumeroOrdre = ''; this.erreur = ''; }
    );
    this.addForm.get('NumeroFacture').valueChanges.subscribe(
      () => { this.erreurnombrePiece = ''; this.erreur = ''; }
    );
    this.addForm.get('montant').valueChanges.subscribe(
      () => { this.erreurnumeroOrdre = ''; this.erreur = ''; }
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
    if (this.addForm.get('numeroCourier').value.trim() === ''){
      this.erreurnumeroCourier = 'Numero courier obligatoire !';
    }
    if (this.addForm.get('Date').value.trim() === ''){
      this.erreurdateDepart = 'Date départ obligatoire !';
    }
    if (this.addForm.get('destination').value.trim() === ''){
      this.erreurdestination = 'Destination obligatoire !';
    }
    if (this.addForm.get('observation').value.trim() === ''){
      this.erreurobservation = 'Observation obligatoire !';
    }
    if (this.addForm.get('numeroArchive').value.trim() === ''){
      this.erreurnumeroArchive = 'Numero archive obligatoire !';
    }
    if (this.addForm.get('nombrePiece').value.trim() === ''){
      this.erreurnombrePiece = 'Nombre Piece obligatoire !';
    }
    if (this.addForm.get('numeroOrdre').value.trim() === ''){
      this.erreurnumeroOrdre = 'Numero ordre obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    console.log(this.addForm.value);
    this.subscribeCourierDepart(this.addForm.value);
  }
  subscribeCourierDepart(objetCourierDepart: any){
    this.methodeService.addCourierDepart(objetCourierDepart)
      .subscribe(
        (data) => {
        this.erreur = 'Courier depart avec success';
        this.router.navigate(['/']);
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
}

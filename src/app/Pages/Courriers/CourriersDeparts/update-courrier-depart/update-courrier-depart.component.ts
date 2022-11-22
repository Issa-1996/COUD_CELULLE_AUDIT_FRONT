import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourierModel } from 'app/Model/Courier.model';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-update-courrier-depart',
  templateUrl: './update-courrier-depart.component.html',
  styleUrls: ['./update-courrier-depart.component.css'],
})
export class UpdateCourrierDepartComponent implements OnInit {
  addForm: FormGroup;

  erreurobservation = '';
  erreur = '';
  success = '';
  courrierDepartModifier: CourierModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private methodeService: MethodeService,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {
    this.courrierDepartModifier = this.transferData.getData();
    this.addForm = this.formBuilder.group({
      id: [''],
      object: ['', Validators.required],
      destinataire: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      dateDepart: ['', Validators.required],
      observation: ['', [Validators.required]],
      NumeroFacture: ['', Validators.required],
      montant: ['', Validators.required],
      assistante: ['', Validators.required],
      coordinateur: ['', Validators.required],
    });
    this.addForm.get('observation').valueChanges.subscribe(() => {
      this.erreurobservation = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.patchValue(this.courrierDepartModifier);
  }

  onSignIn(): any {
    if (this.addForm.get('observation').value.trim() === '') {
      this.erreurobservation = 'Observation obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    this.updateCourierDepart(this.addForm.value);
  }
  updateCourierDepart(objetCourierDepart: any) {
    this.methodeService.updateCourrierDepart(objetCourierDepart).subscribe(
      (data) => {
        this.success = 'COURRIER DEPART MOFIFIER AVEC SUCCESS !!!';
      },
      (error) => {
        // @ts-ignore
        if (error.status === 403) {
          this.erreur = error.error;
        } else {
          this.erreur = "UNE ERREUR S'EST PRODUITE !!!";
        }
      }
    );
  }
}

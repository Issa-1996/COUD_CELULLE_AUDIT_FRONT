import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourierModel } from 'app/Model/Courier.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-courrier-depart-affichage',
  templateUrl: './courrier-depart-affichage.component.html',
  styleUrls: ['./courrier-depart-affichage.component.css'],
})
export class CourrierDepartAffichageComponent implements OnInit {
  addForm: FormGroup;

  erreurdateDepart = '';
  erreurdestination = '';
  erreurnumeroArchive = '';
  erreurobservation = '';
  erreurnumeroOrdre = '';
  erreurnombrePiece = '';
  erreurnumeroCourier = '';
  erreurobject = '';
  erreurNumeroFacture = '';
  erreur = '';
  courrierDepart: CourierModel;
  constructor(
    private formBuilder: FormBuilder,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {
    this.courrierDepart = this.transferData.getData();
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      dateDepart: ['', Validators.required],
      destination: ['', Validators.required],
      observation: ['', [Validators.required]],
      numeroArchive: ['', Validators.required],
      nombrePiece: ['', Validators.required],
      numeroOrdre: ['', Validators.required],
      NumeroFacture: ['', Validators.required],
      montant: ['', Validators.required],
    });
    this.addForm.patchValue(this.courrierDepart);
  }
}

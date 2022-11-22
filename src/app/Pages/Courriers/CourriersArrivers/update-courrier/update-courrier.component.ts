import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-update-courrier',
  templateUrl: './update-courrier.component.html',
  styleUrls: ['./update-courrier.component.css'],
})
export class UpdateCourrierComponent implements OnInit {
  addForm: FormGroup;
  controleurs: UserModel;
  coordonateur: UserModel;
  erreurdateArriver = '';
  erreurexpediteur = '';
  erreurdateCorrespondance = '';
  erreurnumeroCorrespondance = '';
  erreurdateReponse = '';
  erreurnumeroReponse = '';
  erreurnumeroCourier = '';
  erreurobject = '';
  erreurControleur = ' ';
  erreurMontant = '';
  erreurFacture = '';
  erreurdestinataire = '';
  erreur = '';
  success = '';
  search: string;
  dataUpdateCourrier: CourierModel;
  constructor(
    private formBuilder: FormBuilder,
    private methodeService: MethodeService,
    private searchVS: SearchService,
    private transferdata: TransferDataService
  ) {}

  ngOnInit(): void {
    this.dataUpdateCourrier = this.transferdata.getData();
    this.searchVS.currentSearch.subscribe((search) => (this.search = search));
    this.getControleurs();
    this.addForm = this.formBuilder.group({
      id: [''],
      object: ['', Validators.required],
      destinataire: ['', Validators.required],
      NumeroFacture: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      montant: ['', Validators.required],
      dateArriver: ['', Validators.required],
      expediteur: ['', Validators.required],
      controleurs: [''],
    });
    this.addForm.get('object').valueChanges.subscribe(() => {
      this.erreurobject = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('destinataire').valueChanges.subscribe(() => {
      this.erreurdestinataire = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('NumeroFacture').valueChanges.subscribe(() => {
      this.erreurFacture = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('montant').valueChanges.subscribe(() => {
      this.erreurMontant = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('numeroCourier').valueChanges.subscribe(() => {
      this.erreurnumeroCourier = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('dateArriver').valueChanges.subscribe(() => {
      this.erreurdateArriver = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('expediteur').valueChanges.subscribe(() => {
      this.erreurexpediteur = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.get('controleurs').valueChanges.subscribe(() => {
      this.erreurControleur = '';
      this.erreur = '';
      this.success = '';
    });
    this.addForm.patchValue(this.dataUpdateCourrier);
  }
  onSignIn(): any {
    if (this.addForm.get('object').value.trim() === '') {
      this.erreurobject = 'Objet obligatoire !';
    }
    if (this.addForm.get('destinataire').value.trim() === '') {
      this.erreurdestinataire = 'Destinataire obligatoire !';
    }
    if (this.addForm.get('NumeroFacture').value.trim() === '') {
      this.erreurFacture = 'Numero facture obligatoire !';
    }
    if (this.addForm.get('montant').value.trim() === '') {
      this.erreurMontant = 'Montant obligatoire !';
    }
    if (this.addForm.get('numeroCourier').value.trim() === '') {
      this.erreurnumeroCourier = 'Numero Courier obligatoire !';
    }
    if (this.addForm.get('dateArriver').value.trim() === '') {
      this.erreurdateArriver = 'Date Arriver obligatoire !';
    }
    if (this.addForm.get('expediteur').value.trim() === '') {
      this.erreurexpediteur = 'Expediteur obligatoire !';
    }
    if (this.addForm.invalid) {
      return;
    }
    this.addForm.addControl(
      'numeroArriver',
      new FormControl(this.addForm.get('numeroCourier').value)
    );
    // if(this.addForm.get("controleurs").value==""){
    //     // this.addForm.addControl("controleurs",new FormControl(this.dataUpdateCourrier.controleurs));
    // }
    // this.addForm.addControl("assistante",new FormControl("/api/coud/assistantes/"+this.Connecter,));
    // this.addForm.addControl("coordinateur",new FormControl("/api/coud/coordinateurs/"+this.coordonateur,));
    // if(this.addForm.get("controleurs").value !=""){
    // }
    this.updateCourierArriver(this.addForm.value);
  }
  updateCourierArriver(objetCourierArriver: any) {
    this.methodeService.updateCourrierArriver(objetCourierArriver).subscribe(
      (data) => {
        this.success = 'COURRIER ARRIVER MODIFIER AVEC SUCCESS';
        this.newValue(data);
      },
      (error) => {
        // @ts-ignore
        if (error.status === 403) {
          this.erreur = error.error;
        } else {
          this.erreur = "UNE ERREUR S'EST PRODUITE !";
        }
      }
    );
  }
  getControleurs(): any {
    this.methodeService.getControleurs().subscribe(
      (data) => {
        this.controleurs = data['hydra:member'];
      },
      (error: any) => {}
    );
  }
  start = Date.now();
  newValue(search) {
    this.searchVS.changeValue(search);
  }
}

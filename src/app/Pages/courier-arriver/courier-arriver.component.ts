import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-courier-arriver',
  templateUrl: './courier-arriver.component.html',
  styleUrls: ['./courier-arriver.component.css']
})
export class CourierArriverComponent implements OnInit {

  addForm: FormGroup;

  erreurdateArriver = '';
  erreurexpediteur = '';
  erreurdateCorrespondance = '';
  erreurnumeroCorrespondance = '';
  erreurdateReponse = '';
  erreurnumeroReponse = '';
  erreurnumeroCourier = '';
  erreurobject = '';
  erreur = '';
  code = '';
  sending = false;
  btnText = 'Envoyer';
  constructor(private formBuilder: FormBuilder, private router: Router, private methodeService: MethodeService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      object: ['', Validators.required],
      numeroCourier: ['', Validators.required],
      dateArriver: ['', Validators.required],
      expediteur: ['', Validators.required],
      numeroCorrespondance: ['', [Validators.required]],
      dateCorrespondance: ['', Validators.required],
      numeroReponse: ['', Validators.required],
      dateReponse: ['', Validators.required],
    });
    this.addForm.get('object').valueChanges.subscribe(
      () => { this.erreurobject = ''; this.erreur = ''; }
    );
    this.addForm.get('numeroCourier').valueChanges.subscribe(
      () => { this.erreurnumeroCourier = ''; this.erreur = ''; }
    );
    this.addForm.get('dateArriver').valueChanges.subscribe(
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
  }

  onSignIn(): any{
    if (this.addForm.get('object').value.trim() === ''){
      this.erreurobject = 'Objet obligatoire !';
    }
    if (this.addForm.get('numeroCourier').value.trim() === ''){
      this.erreurnumeroCourier = 'Numero Courier obligatoire !';
    }
    if (this.addForm.get('dateArriver').value.trim() === ''){
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
    this.sending = true;
    this.btnText = 'Vérification...';
    this.subscribeCourierArriver(this.addForm.value);
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
        this.sending = false;
        this.btnText = 'Envoyer';
        return;
      });
  }
}

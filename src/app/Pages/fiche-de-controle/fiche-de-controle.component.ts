import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-fiche-de-controle',
  templateUrl: './fiche-de-controle.component.html',
  styleUrls: ['./fiche-de-controle.component.css']
})
export class FicheDeControleComponent implements OnInit {
  

  addForm: FormGroup;

  erreurobjet = '';
  erreurnomControleur = '';
  erreuravisControleur = '';
  erreurmotivation = '';
  erreurrecommandations = '';
  erreur = '';
  code = '';
  sending = false;
  btnText = 'Envoyer';
  constructor(private formBuilder: FormBuilder, private router: Router, private methodeService: MethodeService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      objet: ['', Validators.required],
      nomControleur: ['', Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', [Validators.required]]
    });
    this.addForm.get('objet').valueChanges.subscribe(
      () => { this.erreurobjet = ''; this.erreur = ''; }
    );
    this.addForm.get('nomControleur').valueChanges.subscribe(
      () => { this.erreurnomControleur = ''; this.erreur = ''; }
    );
    this.addForm.get('avisControleur').valueChanges.subscribe(
      () => { this.erreuravisControleur = ''; this.erreur = ''; }
    );
    this.addForm.get('motivation').valueChanges.subscribe(
      () => { this.erreurmotivation = ''; this.erreur = ''; }
    );
    this.addForm.get('recommandations').valueChanges.subscribe(
      () => { this.erreurrecommandations = ''; this.erreur = ''; }
    );
  }

  onSignIn(): any{
    if (this.addForm.get('objet').value.trim() === ''){
      this.erreurobjet = 'Objet obligatoire !';
    }
    if (this.addForm.get('nomControleur').value.trim() === ''){
      this.erreurnomControleur = 'Nom controleur obligatoire !';
    }
    if (this.addForm.get('avisControleur').value.trim() === ''){
      this.erreuravisControleur = 'Avis controleur obligatoire !';
    }
    if (this.addForm.get('motivation').value.trim() === ''){
      this.erreurmotivation = 'Motivation obligatoire !';
    }
    if (this.addForm.get('recommandations').value.trim() === ''){
      this.erreurrecommandations = 'Recommandatio obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.sending = true;
    this.btnText = 'Vérification...';
    this.subscribeFicheDeControle(this.addForm.value);
  }
  subscribeFicheDeControle(objetFicheDeControle: any){
    this.methodeService.addFicheDeControle(objetFicheDeControle)
      .subscribe(
        (data) => {
        this.erreur = 'Fiche de control avec success';
        //this.router.navigate(['/']);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-fiche-de-controle',
  templateUrl: './fiche-de-controle.component.html',
  styleUrls: ['./fiche-de-controle.component.css']
})
export class FicheDeControleComponent implements OnInit {
  

  addForm: FormGroup;
  helper = new JwtHelperService();
  erreurobjet = '';
  erreuravisControleur = '';
  erreurmotivation = '';
  erreurrecommandations = '';
  erreurCourrier = '';
  erreur = '';
  objetCourier:CourierModel;
  coordonateur:UserModel;
  user:UserModel;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private methodeService: MethodeService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getCoordonateur();
    this.connectUser();
    this.addForm = this.formBuilder.group({
      objet: ['', Validators.required],
      avisControleur: ['', Validators.required],
      motivation: ['', Validators.required],
      recommandations: ['', [Validators.required]],
      courier: ['', [Validators.required]],
    });
    this.addForm.get('objet').valueChanges.subscribe(
      () => { this.erreurobjet = ''; this.erreur = ''; }
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
    this.addForm.get('courier').valueChanges.subscribe(
      () => { this.erreurCourrier = ''; this.erreur = ''; }
    );
  }

  onSignIn(): any{
    if (this.addForm.get('objet').value.trim() === ''){
      this.erreurobjet = 'Objet obligatoire !';
    }
    if (this.addForm.get('avisControleur').value.trim() === ''){
      this.erreuravisControleur = 'Avis controleur obligatoire !';
    }
    if (this.addForm.get('motivation').value.trim() === ''){
      this.erreurmotivation = 'Motivation obligatoire !';
    }
    if (this.addForm.get('recommandations').value.trim() === ''){
      this.erreurrecommandations = 'Recommandation obligatoire !';
    }
    if (this.addForm.get('courier').value.trim() === ''){
      this.erreurCourrier = 'Courrier obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.addForm.addControl("controleurs",new FormControl("/api/coud/controleurs/"+this.user,));
    this.addForm.addControl("coordinateur",new FormControl("/api/coud/coordinateurs/"+this.coordonateur,));
    
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
        if (error.status === 403){  this.erreur = error.error; }
        else{  this.erreur = 'Une erreur s\'est produite !';  }});
  }
  connectUser(){
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    const username: string[] = decodedToken.username;
    this.authService.getUserConnected(username)
    .subscribe(data=>{
      const size=data['hydra:member'][0]["couriers"].length;
      this.user=data['hydra:member'][0]["id"];
      this.objetCourier=data['hydra:member'][0]['couriers'][size-1];
      
    })
  }
  getCoordonateur(): any{
    this.methodeService.getCoordonateurs().subscribe(
      (data) => {
        this.coordonateur=data['hydra:member'][0]["id"];
      },
      (error: any) => {
    });
  }
}

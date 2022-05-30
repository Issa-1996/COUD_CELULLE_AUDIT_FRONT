import { Component, OnInit } from '@angular/core';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-fiche-de-controle-affichage',
  templateUrl: './fiche-de-controle-affichage.component.html',
  styleUrls: ['./fiche-de-controle-affichage.component.css']
})
export class FicheDeControleAffichageComponent implements OnInit {

  fiche:FicheDeControlModel;
  constructor(private methodeService: MethodeService) { }

  ngOnInit(): void {
    this.getFicheDeControle();
  }
  getFicheDeControle(): any{
    this.methodeService.getFiche().subscribe(
      (data) => {
        const size=data['hydra:member'].length;
        this.fiche=data['hydra:member'][size-1];
      },
      (error: any) => {
    });
  }
}

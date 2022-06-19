import { Component, OnInit } from '@angular/core';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';

@Component({
  selector: 'app-fiche-de-controle-affichage',
  templateUrl: './fiche-de-controle-affichage.component.html',
  styleUrls: ['./fiche-de-controle-affichage.component.css']
})
export class FicheDeControleAffichageComponent implements OnInit {

  fiche:any;
  constructor(private behavio: BehavioSubjetService) { }

  ngOnInit(): void {
    this.getFicheDeControle();
  }
  getFicheDeControle(): any{
    this.behavio.getValue().subscribe(
      (data) => {
        this.fiche=data;
      },
      (error: any) => {
    });
  }
}

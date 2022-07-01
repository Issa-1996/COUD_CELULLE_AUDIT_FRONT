import { Component, OnInit } from '@angular/core';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  generatePdf(){

  }


}


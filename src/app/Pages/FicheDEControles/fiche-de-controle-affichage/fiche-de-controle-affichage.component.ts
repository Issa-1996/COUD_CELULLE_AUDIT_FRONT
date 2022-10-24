import { Component, OnInit } from '@angular/core';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-fiche-de-controle-affichage',
  templateUrl: './fiche-de-controle-affichage.component.html',
  styleUrls: ['./fiche-de-controle-affichage.component.css'],
})
export class FicheDeControleAffichageComponent implements OnInit {
  fiche: any;
  constructor(private transferdata: TransferDataService) {}

  ngOnInit(): void {
    this.getFicheDeControle();
  }
  getFicheDeControle(): any {
    this.fiche=this.transferdata.getData();
  }

  generatePdf() {}
}

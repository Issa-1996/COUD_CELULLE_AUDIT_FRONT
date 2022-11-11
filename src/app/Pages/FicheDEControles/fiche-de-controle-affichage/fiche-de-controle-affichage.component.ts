import { Component, OnInit } from '@angular/core';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { Line } from 'chartist';

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
    this.fiche=this.transferdata.getData().ficheDeControle;
  }

  //Récupération de l'URL de l'image ;
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
     
      img.onload = () => {
        var canvas = document.createElement("canvas");
       /*canvas.width = img.width;
        canvas.height = img.height;*/
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };
      
      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
  
// Fin de fonction

  //image= "../../../assets/logo_coud copy.png";
 
  async generateFiche(){
   var  documentFiche={
      content:[
        {
          columns:[
             {
              text: 'REPUBLIQUE DU SENEGAL \n Un Peuple - Un But - Une Foi \n MINISTÈRE DE L\'ENSEIGNEMENT SUPÉRIEUR \n  DE LA RECHERCHE ET DE L\'INNOVATION \n CENTRE DES OEUVRES UNIVERSITAIRES DE DAKAR \n Direction',
               style:'headers',
             },
          
             {
             // image: await this.getBase64ImageFromURL("https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"),
             image: await this.getBase64ImageFromURL("../assets/logo_coud.png"),
             },


             {
              text:'  N° ..........................COUD/DIR/CSA  \n Dakar, \nle ............................................ ' , 
              style:'headers',
             }, 
          ]
        },

        {
          text:'FICHE DE CONTROLE INTERNE', 
          style:'subheader',
        },
        
        {
          style: 'tableExample',
          table: {
           widths:['*'],
           heights: [30],
            body: [
              [ `Document objet du controle:  ${ this.fiche["objet"] }` , ],
              
            ]
          }
        },

        {
          style: 'bureau',
          table: {
            widths:['*','*'],
            heights:[50,100],
             body: [
              [ ` Controleur:  ${ this.fiche["controleurs"]["prenom"] } ${ this.fiche["controleurs"]["nom"] }` ,` Avis controleur:  ${ this.fiche["avisControleur"] }` ],
              [ ` Motivation de l\'avis:\n ${ this.fiche["motivation"] }` , ` Recommandation controleur:\n ${ this.fiche["recommandations"] }`,],
            ]
          }
        },

        {
          style: 'signature', 
           table: {
             widths:['*'],
             heights: [50],
              body: [
                [` Signature Controleur: `,],
                
              ]
            }
        
        },
        
       {
        style: 'bureau',
        table: {
          widths:['*','*'],
          heights: [60],
          bold:true,
           body: [
            [`Le chef du Bureau:`, `Le coordonnateur CACG:`],
            
           
          ]
        }
      },
        

      ],
      styles: {
        headers: {
          fontSize: 9,
        },
        subheader:{
          fontSize: 14,
          decoration: 'underline',
          margin: [0, 20, 0, 40],
          alignment: 'center',
          
        },

        tableExample:{
          margin: [0, 0, 0, 40],
          bold: true,
        },

        signature:{
          alignment:'center',
          bold: true,
        },

        bureau: {
          bold: true,
        },
        
        image:{
          width: 40,
          height:40,
        }
      },

    }

    pdfMake.createPdf(documentFiche).open();
  }



}




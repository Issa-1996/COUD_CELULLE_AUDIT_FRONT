import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';


import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { generate } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['J', 'F', 'Mars', 'A', 'M', 'Juin', 'J','A','Septembre','O', 'N', 'Decembre'],
          series: [
              [12, 17, 7, 17, 23, 18, 38, 45, 19, 45, 27, 1]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

/*----------------------GENERER PDF------------------------- */

  image: '../assets/AUDITS.jpg'

  generatePdf()
  {
    var documentDefinition = {
      content: [

        {
          columns:[
             {
              text: 'REPUBLIQUE DU SENEGAL \n Un Peuple - Un But - Une Foi \n MINISTÈRE DE L\'ENSEIGNEMENT SUPÉRIEUR \n  DE LA RECHERCHE ET DE L\'INNOVATION \n CENTRE DES OEUVRES UNIVERSITAIRES DE DAKAR \n Direction',
               style:'headers',
             },
             
             {
              
             }, 
          ]
        },
      	
        {text: 'RAPPORT TRIMESTRIEL DES COURRIERS ARRIVES', style:'header',},
      
       // {text: 'Rapport trimestriel des courriers d\'arrivés', style:'subheader',},
        {
          style: 'tableExemple',
          table: {
            widths: [ '*', '*', '*' ],
            body: [
              [ { text: 'N° Courrier', bold: true },{ text: 'Objet', bold: true },{ text: 'Date', bold: true }],
              [ ' 01', `Facture`,  `03/05/2022` ],
              [ ' 02',  `Document médical`,  `05/05/2022` ],
              [ ' 03',  `Document matriel`,  `08/06/2022` ],
              [ ' 04',  `Facture`,  `03/05/2022` ],
              [ ' 05',  `Document médical`,  `05/05/2022` ],
              [ ' 06',  `Document matriel`,  `08/06/2022` ],
              [ ' 07',  `Facture`,  `03/05/2022` ],
              [ ' 08',  `Document médical`,  `05/05/2022` ],
              [ ' 09',  `Document matriel`,  `08/06/2022` ],
              [ ' 10',  `Document matriel`,  `08/06/2022` ],
              [ ' 11',  `Document médical`,  `05/05/2022` ],
              [ ' 12',  `Document matriel`,  `08/06/2022` ],
              [ ' 13',  `Document médical`,  `05/05/2022` ],
              [ ' 14',  `Document matriel`,  `08/06/2022` ],
            ]
          }
         },
         {
          
            table: {
             widths:[163,'*'],
             heights: [30],
              body: [
                [ { text: 'Total', bold: true }, { text: `14`, alignment: 'right' } ],
                
              ]
            }
          
         },
        
        ],
      
        styles: {
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 40, 0, 10],
            color: 'blue',

          },
          header:{
            fontSize: 20,
            bold: true,
            color: 'blue',
            margin: [0, 40, 0, 10],
            alignment: 'center'

          },

          headers:{
            fontSize: 10,
          },

          footer: {
            columns: [
               'DI/COUD',
              {
                 text: 'Contacter Mr Sylla au 77 700 00 00',
                 alignment: 'left',
                 style:'footer',
                 color:'blue'
              }
            ]
          },
        },
        
    };
    
    pdfMake.createPdf(documentDefinition).open();
   }
/* -----------------------FIN GENERER PDF ARRIVER---------------------*/


generateDepart()
   {
     var documentDepart = {
       content: [

        {
          columns:[
             {
              text: 'REPUBLIQUE DU SENEGAL \n Un Peuple - Un But - Une Foi \n MINISTÈRE DE L\'ENSEIGNEMENT SUPÉRIEUR \n  DE LA RECHERCHE ET DE L\'INNOVATION \n CENTRE DES OEUVRES UNIVERSITAIRES DE DAKAR \n Direction',
               style:'headers',
             },

             {
              
             }, 
          ]
        },
         
         {text: 'RAPPORT TRIMESTRIEL DES COURRIERS DEPARTS', style:'header',},
       
        // {text: 'Rapport trimestriel des courriers départ', style:'subheader',},
         {
           style: 'tableExemple',
           table: {
             widths: [ '*', '*', '*' ],
             body: [
               [ { text: 'N° Courrier', bold: true },{ text: 'Objet', bold: true },{ text: 'Date', bold: true }],
               [ ' 01', `Facture`,  `03/05/2022` ],
               [ ' 02',  `Document médical`,  `05/05/2022` ],
               [ ' 03',  `Document matriel`,  `08/06/2022` ],
               [ ' 02',  `Document médical`,  `05/05/2022` ],
               [ ' 03',  `Document matriel`,  `08/06/2022` ],
               [ ' 02',  `Document médical`,  `05/05/2022` ],
               [ ' 03',  `Document matriel`,  `08/06/2022` ],
               
             ]
           }
          },
          {
           
             table: {
              widths:[163,'*'],
              heights: [30],
               body: [
                 [ { text: 'Total', bold: true }, { text: `07`, alignment: 'right' } ],
                 
               ]
             }
           
          },
         
    
         ],
   
         styles: {
           subheader: {
             fontSize: 15,
             bold: true,
             margin: [0, 40, 0, 10],
             color: 'blue',
   
           },
           header:{
             fontSize: 20,
             bold: true,
             color: 'blue',
             margin: [0, 40, 0, 10],
             alignment: 'center'
   
           },
           headers:{
            fontSize: 10,
           },
           footer: {
            columns: [
              this.image, 'DI/COUD',
              {
                 text: 'Contacter Mr Sylla au 77 700 00 00',
                 alignment: 'left',
                 style:'footer',
                 color:'blue'
              }
            ]
          },
         },
         
     };
     
     pdfMake.createPdf(documentDepart).open();
    }

/*------------------FIN GENERER PDF DEPART------------------ */

 generateRejeter()
    {
      var documentDepart = {
        content: [
          
          {
            columns:[
               {
                text: 'REPUBLIQUE DU SENEGAL \n Un Peuple - Un But - Une Foi \n MINISTÈRE DE L\'ENSEIGNEMENT SUPÉRIEUR \n  DE LA RECHERCHE ET DE L\'INNOVATION \n CENTRE DES OEUVRES UNIVERSITAIRES DE DAKAR \n Direction',
                 style:'headers',
               },
              
               {
                
               }, 
            ]
          },
          {text: 'RAPPORT TRIMESTRIEL DES COURRIERS REJETES', style:'header',},
        
         // {text: 'Rapport trimestriel des courriers rejeter', style:'subheader',},
          {
            style: 'tableExemple',
            table: {
              widths: [ '*', '*', '*' ],
              body: [
                [ { text: 'N° Courrier', bold: true },{ text: 'Objet', bold: true },{ text: 'Date', bold: true }],
                [ ' 01', `Facture`,  `03/05/2022` ],
                [ ' 02',  `Document médical`,  `05/05/2022` ],
                [ ' 03',  `Document matriel`,  `08/06/2022` ],
                [ ' 02',  `Document médical`,  `05/05/2022` ],
                [ ' 03',  `Document matriel`,  `08/06/2022` ],
                [ ' 02',  `Document médical`,  `05/05/2022` ],
                [ ' 03',  `Document matriel`,  `08/06/2022` ],
                [ ' 02',  `Document médical`,  `05/05/2022` ],
                [ ' 03',  `Document matriel`,  `08/06/2022` ],
              ]
            }
          },
          {
            
              table: {
              widths:[163,'*'],
              heights: [30],
                body: [
                  [ { text: 'Total', bold: true }, { text: `09`, alignment: 'right' } ],
                  
                ]
              }
            
          },
          
      

          ],

          styles: {
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 40, 0, 10],
              color: 'blue',

            },
            header:{
              fontSize: 20,
              bold: true,
              color: 'blue',
              margin: [0, 40, 0, 10],
              alignment: 'center'

            },
            headers:{
              fontSize: 10,
            },
            footer: {
              columns: [
                this.image, 'DI/COUD',
                {
                  text: 'Contacter Mr Sylla au 77 700 00 00',
                  alignment: 'left',
                  style:'footer',
                  color:'blue'
                }
              ]
            },
          },
          
      };
      
      pdfMake.createPdf(documentDepart).open();
    }
    /*----------------------FIN GENERER PDF REJETER---------------------- */
     

 }





import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControleComponent } from 'app/Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TempoData } from 'app/Service/tempoData.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { CourierDepartComponent } from '../../CourriersDeparts/courier-depart/courier-depart.component';
import { CourierArriverAffichageComponent } from '../courier-arriver-affichage/courier-arriver-affichage.component';
import { UpdateCourrierComponent } from '../update-courrier/update-courrier.component';

@Component({
  selector: 'app-courrier-liste',
  templateUrl: './courrier-liste.component.html',
  styleUrls: ['./courrier-liste.component.css'],
})
export class CourrierListeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'numeroCourier',
    'objet',
    'type',
    'Date',
    'destinataire',
    'detail',
    'modifier',
    'depart',
  ];
  public role: any[];
  database: CourierModel[] = [];
  datacourrier: CourierModel[] = [];
  dataAssis: CourierModel[] = [];
  objetCourier: CourierModel[] = [];
  helper = new JwtHelperService();
  detailCourrierControleur: any;
  dataSource = new MatTableDataSource<CourierModel>([]);
  dataCourrierDetailControleur = [
    {
      Date: '',
      NumeroFacture: '',
      beneficiaire: '',
      dateCorrespondance: '',
      dateReponse: '',
      expediteur: '',
      id: '',
      montant: '',
      numeroCorrespondance: '',
      numeroCourier: '',
      numeroReponse: '',
      object: '',
    },
  ];

  constructor(
    private methodeService: MethodeService,
    private authService: AuthService,
    private transferdata: TransferDataService,
    private dataDepot: TempoData,
    private searchVS: SearchService,
    public dialog: MatDialog
  ) {}
  detailCourrierArriver(fiche: CourierModel) {
    const dialogRef = this.dialog.open(CourierArriverAffichageComponent);
    this.transferdata.setData(fiche);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  validerCourrierArriver(fiche: any) {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    if (decodedToken.roles.includes('ROLE_CONTROLEURS')) {
      const dialogRef = this.dialog.open(FicheDeControleComponent);
      this.transferdata.setData(fiche);
      this.dataDepot.setData(fiche);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      this.dataDepot.setData(fiche);
    } else if (decodedToken.roles.includes('ROLE_COORDINATEUR')) {
      const dialogRef = this.dialog.open(CourierDepartComponent);
      this.transferdata.setData(fiche);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      this.dataDepot.setData(fiche);
    }
  }
  modifierCourrierArriver(fiche: any): any {
    this.transferdata.setData(fiche);
    const dialogRef = this.dialog.open(UpdateCourrierComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
    this.listeCourrier();
    this.dataSource.paginator = this.paginator;
  }
  listeCourrier() {
    var compt = 0;
    if (this.role.includes('ROLE_CONTROLEURS')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courrier'];
        for (let index = 0; index < this.database.length; index++) {
          if (this.database[index]['@type'] == 'CourierArriver') {
            if (this.database[index].etat == '0') {
              if (this.database[index].statut == '0') {
                this.datacourrier[index] = this.database[index];
                this.objetCourier = this.datacourrier.filter(function (el) {
                  return el != null;
                });
              }
            }
          }
        }
        for (let index = 0; index < this.objetCourier.length; index++) {
          this.searchVS.currentSearch.subscribe((data: any) => {
            if (data != 0) {
              if (this.objetCourier[index]['id'] == data['id']) {
                this.objetCourier[index] = data;
                this.dataSource = new MatTableDataSource<CourierModel>(
                  this.objetCourier
                );
                this.dataSource.paginator = this.paginator;
              } else {
                if (data.length != 0) {
                  if (this.objetCourier.includes(data)) {
                    // console.log("OUIIII");
                  } else if (!this.objetCourier.includes(data)) {
                    compt++;
                  }
                }
              }
              if (compt == this.objetCourier.length) {
                this.objetCourier[index + 1] = data;
                this.dataSource = new MatTableDataSource<CourierModel>(
                  this.objetCourier
                );
                this.dataSource.paginator = this.paginator;
              }
            }
          });
        }
        this.dataSource = new MatTableDataSource<CourierModel>(
          this.objetCourier
        );
        this.dataSource.paginator = this.paginator;
      });
    }

    if (this.role.includes('ROLE_ASSISTANTE')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courier'];
        for (let index = 0; index < this.database.length; index++) {
          const element = this.database[index];
          if (element['@type'] == 'CourierArriver') {
            this.dataAssis[index] = element;
          }
        }
        this.dataAssis = this.dataAssis.filter(function (el) {
          return el != null;
        });
        if (this.dataAssis.length == 0) {
          this.searchVS.currentSearch.subscribe((dataa: any) => {
            if (dataa) {
              this.dataAssis = dataa;
              this.dataSource = new MatTableDataSource<CourierModel>(
                this.dataAssis
              );
              this.dataSource.paginator = this.paginator;
            }
          });
        } else {
          for (let index = 0; index < this.dataAssis.length; index++) {
            if (this.dataAssis[index].etat == '0') {
              if (this.dataAssis[index].statut == '0') {
                this.datacourrier[index] = this.dataAssis[index];
                this.objetCourier = this.datacourrier.filter(function (el) {
                  return el != null;
                });
              }
            }
          }
          for (let index = 0; index < this.objetCourier.length; index++) {
            this.searchVS.currentSearch.subscribe((data: any) => {
              if (data != 0) {
                if (this.objetCourier[index]['id'] == data['id']) {
                  this.objetCourier[index] = data;
                  this.dataSource = new MatTableDataSource<CourierModel>(
                    this.objetCourier
                  );
                  this.dataSource.paginator = this.paginator;
                } else {
                  if (data.length != 0) {
                    if (this.objetCourier.includes(data)) {
                      // console.log("OUIIII");
                    } else if (!this.objetCourier.includes(data)) {
                      compt++;
                    }
                  }
                }
                if (compt == this.objetCourier.length) {
                  this.objetCourier[index + 1] = data;
                  this.dataSource = new MatTableDataSource<CourierModel>(
                    this.objetCourier
                  );
                  this.dataSource.paginator = this.paginator;
                }
              }
            });
          }
          this.dataSource = new MatTableDataSource<CourierModel>(
            this.objetCourier
          );
          this.dataSource.paginator = this.paginator;
        }
      });
    }

    if (this.role.includes('ROLE_COORDINATEUR')) {
      this.methodeService.getCourriers().subscribe((data) => {
        this.database = data['hydra:member'];

        if (this.database.length == 0) {
          this.searchVS.currentSearch.subscribe((dataa: any) => {
            if (dataa) {
              this.database = dataa;
              this.dataSource = new MatTableDataSource<CourierModel>(
                this.database
              );
              this.dataSource.paginator = this.paginator;
            }
          });
        } else {
          for (let index = 0; index < this.database.length; index++) {
            if (this.database[index].etat == '0') {
              if (this.database[index].statut == '0') {
                this.datacourrier[index] = this.database[index];
                this.objetCourier = this.datacourrier.filter(function (el) {
                  return el != null;
                });
              }
            }
          }
          for (let index = 0; index < this.objetCourier.length; index++) {
            this.searchVS.currentSearch.subscribe((data: any) => {
              if (data != 0) {
                if (this.objetCourier[index]['id'] == data['id']) {
                  this.objetCourier[index] = data;
                  this.dataSource = new MatTableDataSource<CourierModel>(
                    this.objetCourier
                  );
                  this.dataSource.paginator = this.paginator;
                } else {
                  if (data.length != 0) {
                    if (this.objetCourier.includes(data)) {
                      // console.log("OUIIII");
                    } else if (!this.objetCourier.includes(data)) {
                      compt++;
                    }
                  }
                }
                if (compt == this.objetCourier.length) {
                  this.objetCourier[index + 1] = data;
                  this.dataSource = new MatTableDataSource<CourierModel>(
                    this.objetCourier
                  );
                  this.dataSource.paginator = this.paginator;
                }
              }
            });
          }
          this.dataSource = new MatTableDataSource<CourierModel>(
            this.objetCourier
          );
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  detailFiche(fiche: any): any {
    this.dataCourrierDetailControleur = fiche;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

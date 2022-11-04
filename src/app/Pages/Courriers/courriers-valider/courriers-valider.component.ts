import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControleModifierComponent } from 'app/Pages/FicheDEControles/fiche-de-controle-modifier/fiche-de-controle-modifier.component';
import { FicheDeControleComponent } from 'app/Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TempoData } from 'app/Service/tempoData.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { CourierArriverAffichageComponent } from '../CourriersArrivers/courier-arriver-affichage/courier-arriver-affichage.component';
import { CourierDepartComponent } from '../CourriersDeparts/courier-depart/courier-depart.component';

@Component({
  selector: 'courriers-valider',
  templateUrl: './courriers-valider.component.html',
  styleUrls: ['./courriers-valider.component.css'],
})
export class CourriersValiderComponent implements AfterViewInit, OnInit {
  displayedColumn: string[] = [
    'id',
    'objet',
    'type',
    'date',
    'beneficiaire',
    'expediteur',
    'detail',
    'fiche',
    'depart',
  ];
  public role: any[];
  database: CourierModel[] = [];
  datacourrier: CourierModel[] = [];
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
    // private dataDepot: TempoData,
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
  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
    this.listeCourrier();
    this.dataSource.paginator = this.paginator;
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

  modifierFicheDeControle(fiche: any) {
    const dialogRef = this.dialog.open(FicheDeControleModifierComponent);
    this.transferdata.setData(fiche);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  listeCourrier() {
    var compt = 0;
    if (this.role.includes('ROLE_CONTROLEURS')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courierArrivers'];

        for (let index = 0; index < this.database.length; index++) {
          if (this.database[index].etat == '0') {
            if (this.database[index].statut == '1') {
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
      });
    }

    if (this.role.includes('ROLE_COORDINATEUR')) {
      this.methodeService.getCourriers().subscribe((data) => {
        this.database = data['hydra:member'];
        for (let index = 0; index < this.database.length; index++) {
          if (this.database[index].etat == '0') {
            if (this.database[index].statut == '1') {
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
      });
    }
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

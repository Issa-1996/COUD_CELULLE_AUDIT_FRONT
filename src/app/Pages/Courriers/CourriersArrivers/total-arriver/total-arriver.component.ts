import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControleAffichageComponent } from 'app/Pages/FicheDEControles/fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { FicheDeControleModifierComponent } from 'app/Pages/FicheDEControles/fiche-de-controle-modifier/fiche-de-controle-modifier.component';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TempoData } from 'app/Service/tempoData.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { CourierArriverAffichageComponent } from '../courier-arriver-affichage/courier-arriver-affichage.component';

@Component({
  selector: 'total-arriver',
  templateUrl: './total-arriver.component.html',
  styleUrls: ['./total-arriver.component.css'],
})
export class TotalArriverComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroCourier',
    'objet',
    'type',
    'Date',
    'beneficiaire',
    'detail',
    'fiche',
  ];
  public role: any[];
  database: CourierModel[] = [];
  dataTempo: CourierModel[] = [];
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
  detailFiche(fiche: CourierModel) {
    const dialogRef = this.dialog.open(FicheDeControleAffichageComponent);
    this.transferdata.setData(fiche);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierFicheDeControle(fiche: any) {
    const dialogRef = this.dialog.open(FicheDeControleModifierComponent);
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
  listeCourrier() {
    var compt = 0;
    if (this.role.includes('ROLE_CONTROLEURS')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courierArrivers'];
        for (let i = 0; i < this.database.length; i++) {
          if (this.database[i].ficheDeControle != null) {
            if (this.database[i].etat == '1') {
              this.dataTempo[i] = this.database[i];
            }
          }
        }

        for (let index = 0; index < this.dataTempo.length; index++) {
          this.datacourrier[index] = this.dataTempo[index];
          this.objetCourier = this.datacourrier.filter(function (el) {
            return el != null;
          });
        }

        this.dataSource = new MatTableDataSource<CourierModel>(
          this.objetCourier
        );
        this.dataSource.paginator = this.paginator;
      });
    }

    if (
      this.role.includes('ROLE_ASSISTANTE') ||
      this.role.includes('ROLE_COORDINATEUR')
    ) {
      this.methodeService.getCourriers().subscribe((data) => {
        this.database = data['hydra:member'];
        for (let i = 0; i < this.database.length; i++) {
          if (this.database[i].ficheDeControle != null) {
            if (this.database[i].etat == '1') {
              this.dataTempo[i] = this.database[i];
            }
          }
        }
        for (let index = 0; index < this.dataTempo.length; index++) {
          this.datacourrier[index] = this.dataTempo[index];
          this.objetCourier = this.datacourrier.filter(function (el) {
            return el != null;
          });
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

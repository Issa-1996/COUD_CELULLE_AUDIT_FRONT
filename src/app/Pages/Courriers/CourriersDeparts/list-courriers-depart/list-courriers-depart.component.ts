import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { SearchService } from 'app/Service/search.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { CourrierDepartAffichageComponent } from '../courrier-depart-affichage/courrier-depart-affichage.component';
import { UpdateCourrierDepartComponent } from '../update-courrier-depart/update-courrier-depart.component';

@Component({
  selector: 'app-list-courriers-depart',
  templateUrl: './list-courriers-depart.component.html',
  styleUrls: ['./list-courriers-depart.component.css'],
})
export class ListCourriersDepartComponent implements AfterViewInit, OnInit {
  public role: any[];
  database: CourierModel[] = [];
  datacourrier: CourierModel[] = [];
  dataAssis: CourierModel[] = [];
  objetCourier: CourierModel[] = [];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<CourierModel>([]);
  displayedColumns: string[] = [
    'numeroCourier',
    'objet',
    'type',
    'dateDepart',
    'destinataire',
    'detail',
    'modifier',
    'imprimer',
  ];

  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
    this.listeCourrierDepart();
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    public dialog: MatDialog,
    private methodeService: MethodeService,
    private transferData: TransferDataService,
    private authService: AuthService,
    private searchVS: SearchService
  ) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  detailCourrierDepart(objet: any) {
    this.transferData.setData(objet);
    const dialogRef = this.dialog.open(CourrierDepartAffichageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierCourrierDepart(objet: any) {
    this.transferData.setData(objet);
    const dialogRef = this.dialog.open(UpdateCourrierDepartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  listeCourrierDepart() {
    var compt = 0;
    if (this.role.includes('ROLE_CONTROLEUR')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courrier'];
        for (let index = 0; index < this.database.length; index++) {
          if (this.database[index]['@type'] == 'CourierDepart') {
            this.datacourrier[index] = this.database[index];
            this.objetCourier = this.datacourrier.filter(function (el) {
              return el != null;
            });
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
      this.methodeService.getAllCourriersDepart().subscribe((data) => {
        this.database = data['hydra:member'];
        for (let index = 0; index < this.database.length; index++) {
          this.searchVS.currentSearch.subscribe((data: any) => {
            if (data != 0) {
              if (this.database[index]['id'] == data['id']) {
                this.database[index] = data;
                this.dataSource = new MatTableDataSource<CourierModel>(
                  this.database
                );
                this.dataSource.paginator = this.paginator;
              } else {
                if (data.length != 0) {
                  if (this.database.includes(data)) {
                    // console.log("OUIIII");
                  } else if (!this.database.includes(data)) {
                    compt++;
                  }
                }
              }
              if (compt == this.database.length) {
                this.database[index + 1] = data;
                this.dataSource = new MatTableDataSource<CourierModel>(
                  this.database
                );
                this.dataSource.paginator = this.paginator;
              }
            }
          });
        }
        this.dataSource = new MatTableDataSource<CourierModel>(this.database);
        this.dataSource.paginator = this.paginator;
      });
    }

    if (this.role.includes('ROLE_COORDONATEUR')) {
      this.methodeService.getAllCourriersDepart().subscribe((data) => {
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
            this.datacourrier[index] = this.database[index];
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
        }
      });
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

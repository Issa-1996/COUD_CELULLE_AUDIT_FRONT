import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
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
    'Date',
    'beneficiaire',
    'detail',
    'modifier',
    'depart',
    'rejet',
  ];
  displayedColumn: string[] = ['id', 'objet', 'date', 'beneficiaire', 'detail'];
  public role: any[];
  database: CourierModel[] = [];
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
    private behavio: BehavioSubjetService,
    public dialog: MatDialog
  ) {}
  detailCourrierArriver(fiche: any) {
    this.behavio.setValue(fiche);
    const dialogRef = this.dialog.open(CourierArriverAffichageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  departCourrierArriver(fiche: any) {    
    this.behavio.setValue(fiche);
    const dialogRef = this.dialog.open(CourierDepartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierCourrierArriver(fiche: any): any {    
    this.behavio.setValue(fiche);
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
    if (this.role.includes('ROLE_CONTROLEURS')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.database = data['hydra:member'][0]['courierArrivers'];
        this.dataSource = new MatTableDataSource<CourierModel>(this.database);
        this.dataSource.paginator = this.paginator;
      });
    }
    if (
      this.role.includes('ROLE_ASSISTANTE') ||
      this.role.includes('ROLE_COORDINATEUR')
    ) {
      this.methodeService.getCourriers().subscribe((data) => {
        this.database = data['hydra:member'];
        this.behavio.getValue().subscribe((d) => {
          if (d.length != 0) {
            this.database.push(d);
            this.dataSource = new MatTableDataSource<CourierModel>(
              this.database
            );
            this.dataSource.paginator = this.paginator;
          } else {
            this.dataSource = new MatTableDataSource<CourierModel>(
              this.database
            );
            this.dataSource.paginator = this.paginator;
          }
        });
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

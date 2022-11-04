import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { CourierDepartComponent } from '../courier-depart/courier-depart.component';
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
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<CourierModel>([]);

  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
    this.listeCourrier();
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    public dialog: MatDialog,
    private methodeService: MethodeService,
    private transferData: TransferDataService
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
  listeCourrier() {
    this.methodeService.getAllCourriersDepart().subscribe((data) => {
      this.database = data['hydra:member'];
      this.dataSource = new MatTableDataSource<CourierModel>(this.database);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'destination',
    'beneficiaire',
    'detail',
    'modifier',
    'imprimer',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

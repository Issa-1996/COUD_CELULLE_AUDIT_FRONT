import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { MethodeService } from 'app/Service/methode.service';
import { log } from 'console';
import { data } from 'jquery';
import { FicheDeControleAffichageComponent } from '../fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { FicheDeControleModifierComponent } from '../fiche-de-controle-modifier/fiche-de-controle-modifier.component';
import { FicheDeControleComponent } from '../fiche-de-controle/fiche-de-controle.component';

@Component({
  selector: 'app-fiche-de-controle-interne',
  templateUrl: './fiche-de-controle-interne.component.html',
  styleUrls: ['./fiche-de-controle-interne.component.css']
})
export class FicheDeControleInterneComponent implements AfterViewInit, OnInit {
  displayedColumn: string[] = [
    'id',
    'objet',
    'date',
    'type',
    'detail',
    'modifier'
  ];
  dataSource: MatTableDataSource<CourierModel> = new MatTableDataSource([]);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  myPageEvent: PageEvent;
  myPageIndex = 1;
  myPageSize = 5;
  myPageLength: number;
  showClose = false;
  filter = '';
  spinner = false;
  helper = new JwtHelperService();
  public role: any[];
  controleur: UserModel;
  Connecter: UserModel;

  constructor(
    private methodeService: MethodeService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    // Create 100 users
    const users = this.listeFicheControle;

    // Assign the data to the data source for the table to render
  }
  modifier() {
    const dialogRef = this.dialog.open(FicheDeControleModifierComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  detail() {
    const dialogRef = this.dialog.open(FicheDeControleAffichageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
  }

  ngAfterViewInit() {
    this.listeFicheControle();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (filterValue.length >= 6) {
      this.spinner = true;
      this.methodeService
        .getOneCourriers(filterValue.trim())
        .subscribe((courrier: CourierModel) => {
          // tslint:disable-next-line:triple-equals
          this.spinner = false;
          if (courrier['hydra:member'].length != 0) {
            this.dataSource = new MatTableDataSource(courrier['hydra:member']);
            this.myPageLength = courrier['hydra:totalItems'];
            this.showClose = true;
          }
        });
    }
  }
  listeFicheControle() {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.controleur = data['hydra:member'][0];
        this.Connecter = data['hydra:member'][0]["FicheDeControle"];
        // console.log(this.Connecter);
       // console.log(this.Connecter);
        
        this.dataSource = new MatTableDataSource(data['hydra:member'][0]['FicheDeControle']);
      //  console.log(this.dataSource);
        
      });
  }
  // Pagination
  public getServerData(event?: PageEvent): any {
    // console.log(event);
    if (event.pageIndex + 1 > this.myPageIndex) {
      this.myPageIndex = event.pageIndex + 1;
    } else if (event.pageIndex + 1 < this.myPageIndex) {
      this.myPageIndex = event.pageIndex + 1;
    }

    // tslint:disable-next-line:triple-equals
    // if (this.niveauChoisi != '') {
    //   this.getReservationByNiveau(this.niveauChoisi, this.myPageIndex, event.pageSize);
    // }
    // else{
    // this.getReservation( this.myPageIndex, event.pageSize);
    // }
  }
}

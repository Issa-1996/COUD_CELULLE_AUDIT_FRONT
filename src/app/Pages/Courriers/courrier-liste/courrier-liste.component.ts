import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';
import { data } from 'jquery';
import { logWarnings } from 'protractor/built/driverProviders';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-courrier-liste',
  templateUrl: './courrier-liste.component.html',
  styleUrls: ['./courrier-liste.component.css'],
})
export class CourrierListeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'objet',
    'date',
    'type',
    'detail',
    'modifier',
  ];
  displayedColumn: string[] = [
    'id',
    'objet',
    'date',
    'type',
    'detail',
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
    private bihavio: BehavioSubjetService
  ) {
    // Create 100 users
    //const users = this.listeCourrier;
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
  }
  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;  
    this.listeCourrier();  
  }

  ngAfterViewInit() {
    this.listeCourrier();
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
          console.log(courrier);
          
          this.bihavio.getValue().subscribe(
            (test)=>{
              courrier['hydra:member']+=test;
          })
         
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
  listeCourrier() {
    if (this.role.includes('ROLE_CONTROLEURS')) {
      const decodedToken = this.helper.decodeToken(
        localStorage.getItem('token')
      );
      const username: string[] = decodedToken.username;
      this.authService.getUserConnected(username).subscribe((data) => {
        this.controleur = data['hydra:member'][0];
        this.Connecter = data['hydra:member'][0]['couriers'];
        this.dataSource = new MatTableDataSource(data['hydra:member'][0]['couriers']);
      //  console.log(this.dataSource);
      });
    }
    if (
      this.role.includes('ROLE_ASSISTANTE') ||
      this.role.includes('ROLE_COORDINATEUR')
    ) {
      this.methodeService.getAllCourriers().subscribe((data) => {
        
        this.bihavio.getValue().subscribe(
          (test)=>{
            if(test!=null){
              console.log(test);
              //data['hydra:member']["hydra:totalItems"]=test;            
              console.log(data);
            }         
        }) 
        this.dataSource = new MatTableDataSource(data['hydra:member']);
       
      });
    }
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

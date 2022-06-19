import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { AuthService } from 'app/Service/auth.service';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { MethodeService } from 'app/Service/methode.service';

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
  displayedColumn: string[] = ['id', 'objet', 'date', 'type', 'detail'];
  public role: any[];
  database: CourierModel[] = [];
  helper = new JwtHelperService();
  detailCourrierControleur:any;
  dataSource = new MatTableDataSource<CourierModel>([]);
  dataCourrierDetailControleur=[
    {
      "Date": "",
      "NumeroFacture": "",
      "beneficiaire": "",
      "dateCorrespondance": "",
      "dateReponse": "",
      "expediteur": "",
      "id": "",
      "montant": "",
      "numeroCorrespondance": "",
      "numeroCourier": "",
      "numeroReponse": "",
      "object": ""
    },
  ];

  constructor(
    private methodeService: MethodeService,
    private authService: AuthService,
    private behavio: BehavioSubjetService
  ) {}
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
        this.database = data['hydra:member'][0]['couriers'];
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
        this.dataSource = new MatTableDataSource<CourierModel>(this.database);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  archive(fiche: any): any{
    this.dataCourrierDetailControleur=fiche; 
    console.log(this.dataCourrierDetailControleur);
       
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

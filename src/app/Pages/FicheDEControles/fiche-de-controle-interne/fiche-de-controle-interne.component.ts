import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CourierModel } from 'app/Model/Courier.model';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
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
  styleUrls: ['./fiche-de-controle-interne.component.css'],
})
export class FicheDeControleInterneComponent implements AfterViewInit, OnInit {
  public role: any[];
  database:FicheDeControlModel[]=[];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<FicheDeControlModel>([]);


  ngOnInit(): void {
    this.listesFiches();
    this.dataSource.paginator = this.paginator;
  }
  constructor(private methodeService: MethodeService) {}
  listesFiches() {
    this.methodeService.getFiche().subscribe((data) => {
      this.database=data["hydra:member"];
      // console.log(this.dataSource);
      this.dataSource = new MatTableDataSource<FicheDeControlModel>(this.database);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
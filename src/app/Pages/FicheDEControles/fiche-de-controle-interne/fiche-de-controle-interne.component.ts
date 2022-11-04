import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FicheDeControlModel } from 'app/Model/FicheDeControl.model';
import { MethodeService } from 'app/Service/methode.service';
import { FicheDeControleComponent } from '../fiche-de-controle/fiche-de-controle.component';
import { FicheDeControleAffichageComponent } from '../fiche-de-controle-affichage/fiche-de-controle-affichage.component';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';
import { FicheDeControleModifierComponent } from '../fiche-de-controle-modifier/fiche-de-controle-modifier.component';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { SearchService } from 'app/Service/search.service';
import { AuthService } from 'app/Service/auth.service';

@Component({
  selector: 'app-fiche-de-controle-interne',
  templateUrl: './fiche-de-controle-interne.component.html',
  styleUrls: ['./fiche-de-controle-interne.component.css'],
})
export class FicheDeControleInterneComponent implements AfterViewInit, OnInit {
  public username: any[];
  database: FicheDeControlModel[] = [];
  helper = new JwtHelperService();
  // detailFiche: FicheDeControlModel;
  dataSource = new MatTableDataSource<FicheDeControlModel>([]);

  ngOnInit(): void {
    this.listesFiches();
    this.dataSource.paginator = this.paginator;
  }     
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private transferdata: TransferDataService,
    private searchVS: SearchService,
  ) {}
  detailFicheDeControle(fiche: any) {
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
  listesFiches() {
    var compt = 0;
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.username = decodedToken.username;
    this.authService.getUserConnected(this.username).subscribe((data) => {
      this.database = data['hydra:member'][0]["courierArrivers"][0];      
      for (let index = 0; index < this.database.length; index++) {
        this.searchVS.currentSearch.subscribe((data: any) => {
          if (data != 0) {
            if (this.database[index]['id'] == data['id']) {
              this.database[index] = data;
              this.dataSource = new MatTableDataSource<FicheDeControlModel>(
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
              this.dataSource = new MatTableDataSource<FicheDeControlModel>(
                this.database
              );
              this.dataSource.paginator = this.paginator;
            }
          }
        });
      }
      this.dataSource = new MatTableDataSource<FicheDeControlModel>(
        this.database
      );
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'nom',
    'detail',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

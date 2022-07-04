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

@Component({
  selector: 'app-fiche-de-controle-interne',
  templateUrl: './fiche-de-controle-interne.component.html',
  styleUrls: ['./fiche-de-controle-interne.component.css'],
})
export class FicheDeControleInterneComponent implements AfterViewInit, OnInit {
  public role: any[];
  database: FicheDeControlModel[] = [];
  helper = new JwtHelperService();
  // detailFiche: FicheDeControlModel;
  dataSource = new MatTableDataSource<FicheDeControlModel>([]);

  ngOnInit(): void {
    this.listesFiches();
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private methodeService: MethodeService,
    public dialog: MatDialog,
    private behavio: BehavioSubjetService
  ) {}
  detailFicheDeControle(fiche: any) {
    this.behavio.setValue(fiche);
    const dialogRef = this.dialog.open(FicheDeControleAffichageComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierFicheDeControle(fiche: any) {
    this.behavio.setValue(fiche);
    const dialogRef = this.dialog.open(FicheDeControleModifierComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  listesFiches() {
    this.methodeService.getFiche().subscribe((data) => {
      this.database = data['hydra:member'];
      this.behavio.getValue().subscribe((d) => {
        if (d.length != 0) {
          this.database.push(d);
        }
      });
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
    'modifier',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

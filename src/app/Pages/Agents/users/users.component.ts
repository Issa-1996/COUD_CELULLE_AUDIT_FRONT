import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserModel } from 'app/Model/User.model';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  database: UserModel[] = [];
  dataSource = new MatTableDataSource<UserModel>([]);
  ngOnInit(): void {
    this.listeUsers();
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private methodeService: MethodeService,
    public dialog: MatDialog,
    private transferdata: TransferDataService
  ) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['matricule', 'prenom', 'nom', 'profil', 'detail', 'modifier'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ajoutNewAgent() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierAgent(user:any) {
    const dialogRef = this.dialog.open(UpdateUserComponent);
    this.transferdata.setData(user);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  detailAgent(user:any) {
    const dialogRef = this.dialog.open(DetailUserComponent);
    this.transferdata.setData(user);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  listeUsers() {
    this.methodeService.getAllUsers().subscribe((data) => {
      this.database = data['hydra:member'];
      this.dataSource = new MatTableDataSource<UserModel>(this.database);
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatPaginator, } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserModel } from 'app/Model/User.model';
import { MethodeService } from 'app/Service/methode.service';


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
    private methodeService: MethodeService
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
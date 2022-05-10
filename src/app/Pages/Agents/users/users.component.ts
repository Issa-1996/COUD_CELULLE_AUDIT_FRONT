import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatPaginator, } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {

  addForm: FormGroup;
  constructor(){}
  ngOnInit(): void {
  }
  displayedColumns: string[] = [ 'matricule', 'nom', 'prenom', 'profil', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
 
  matricule: number;
  nom: string;
  prenom: string;
  profil: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {matricule: 1, nom: 'Hydrogen', prenom: 'ndeye', profil: 'contoleur', action:'Modifier'},
  {matricule: 2, nom: 'Helium', prenom: 'ousmane', profil: 'assistante', action:'Modifier'},
  {matricule: 3, nom: 'Lithium', prenom: 'issa', profil: 'coordinateur', action:'Modifier'},
  {matricule: 4, nom: 'Beryllium', prenom: 'moustapha', profil:'coordinateur', action:'Modifier'},
  {matricule: 5, nom: 'Boron', prenom: 'gnilane',profil: 'assistante', action:'Modifier'},
  {matricule: 6, nom: 'Carbon', prenom: 'doudou',profil: 'contoleur', action:'Modifier'},
  {matricule: 7, nom: 'Nitrogen', prenom: 'astou', profil: 'coordinateur', action:'Modifier'},
  {matricule: 8, nom: 'Oxygen', prenom: 'abdoulaye', profil: 'assistante', action:'Modifier'},
  {matricule: 9, nom: 'Fluorine', prenom: 'ousseyenou', profil: 'contoleur', action:'Modifier'},
  {matricule: 10, nom: 'Neon', prenom: 'atoumane', profil: 'coordinateur', action:'Modifier'},
  {matricule: 11, nom: 'Sodium', prenom: 'abdoulahh', profil: 'contoleur', action:'Modifier'},
  {matricule: 12, nom: 'Magnesium', prenom: 'aziz', profil: 'assistante', action:'Modifier'},
  {matricule: 13, nom: 'Aluminum', prenom: 'soda', profil: 'contoleur', action:'Modifier'},
  {matricule: 14, nom: 'Silicon', prenom: 'mame faty', profil: 'contoleur', action:'Modifier'},
  {matricule: 15, nom: 'Phosphorus', prenom: 'khoudia', profil: 'coordinateur', action:'Modifier'},
  {matricule: 16, nom: 'Sulfur', prenom: 'modou', profil: 'coordinateur', action:'Modifier'},
  {matricule: 17, nom: 'Chlorine', prenom: 'fatima', profil: 'assistante', action:'Modifier'},
  {matricule: 18, nom: 'Argon', prenom: 'assane', profil: 'contoleur', action:'Modifier'},
  {matricule: 19, nom: 'Potassium', prenom: 'khady', profil: 'coordinateur', action:'Modifier'},
  {matricule: 20, nom: 'Calcium', prenom: 'absa', profil: 'contoleur', action:'Modifier'},
];

 


 

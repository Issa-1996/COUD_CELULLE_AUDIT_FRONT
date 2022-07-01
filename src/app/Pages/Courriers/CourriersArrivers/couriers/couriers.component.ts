import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FicheDeControleComponent } from 'app/Pages/FicheDEControles/fiche-de-controle/fiche-de-controle.component';
import { CourierArriverComponent } from '../courier-arriver/courier-arriver.component';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.css']
})
export class CouriersComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  helper = new JwtHelperService();
  public  role: any[];

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  nouveauCourrier() {
    const dialogRef = this.dialog.open(CourierArriverComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  nouveauFicheControle() {
    const dialogRef = this.dialog.open(FicheDeControleComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.role = decodedToken.roles;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

}

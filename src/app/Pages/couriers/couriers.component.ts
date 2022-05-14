import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private _formBuilder: FormBuilder) {}

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

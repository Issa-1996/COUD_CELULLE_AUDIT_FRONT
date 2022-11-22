import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilModel } from 'app/Model/Profil.model';
import { UserModel } from 'app/Model/User.model';
import { MethodeService } from 'app/Service/methode.service';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  addForm: FormGroup;
  dataUserUpdate: any;

  constructor(
    private formBuilder: FormBuilder,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {
    this.dataUserUpdate = this.transferData.getData();
    this.addForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      profil: [''],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required]],
      dateAjout: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.addForm.patchValue(this.dataUserUpdate);
    // console.log(this.dataUserUpdate.roles[0]);
  }
}

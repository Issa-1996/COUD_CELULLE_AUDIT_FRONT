import { Component, OnInit } from '@angular/core';
import { CourierModel } from 'app/Model/Courier.model';
import { UserModel } from 'app/Model/User.model';
import { TransferDataService } from 'app/Service/transfer-data.service';

@Component({
  selector: 'app-courier-arriver-affichage',
  templateUrl: './courier-arriver-affichage.component.html',
  styleUrls: ['./courier-arriver-affichage.component.css'],
})
export class CourierArriverAffichageComponent implements OnInit {
  courrierDetail: CourierModel;
  constructor(private transferdata: TransferDataService) {}

  ngOnInit(): void {
    this.detailCourrierArriver();
  }
  detailCourrierArriver(): any {
    this.courrierDetail=this.transferdata.getData();
  }
}

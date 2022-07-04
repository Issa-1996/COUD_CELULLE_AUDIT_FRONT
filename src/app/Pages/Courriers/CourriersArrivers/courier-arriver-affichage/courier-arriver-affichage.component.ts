import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/Model/User.model';
import { BehavioSubjetService } from 'app/Service/behavio-subjet.service';

@Component({
  selector: 'app-courier-arriver-affichage',
  templateUrl: './courier-arriver-affichage.component.html',
  styleUrls: ['./courier-arriver-affichage.component.css'],
})
export class CourierArriverAffichageComponent implements OnInit {
  courrierDetail: UserModel;
  constructor(private behavio: BehavioSubjetService) {}

  ngOnInit(): void {
    this.detailCourrierArriver();
  }
  detailCourrierArriver(): any {
    this.behavio.getValue().subscribe(
      (data) => {
        this.courrierDetail = data;
      },
      (error: any) => {}
    );
  }
}

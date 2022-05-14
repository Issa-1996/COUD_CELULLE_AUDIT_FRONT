import { Component, OnInit } from '@angular/core';
import { CourierModel } from 'app/Model/Courier.model';
import { MethodeService } from 'app/Service/methode.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  courrier:CourierModel;
  constructor(private methodeService: MethodeService) { }

  ngOnInit(): void {
    this.getCourrierArrivers();
  }

  getCourrierArrivers(): any{
    this.methodeService.getCourriers().subscribe(
      (data) => {
        this.courrier=data['hydra:member'];
        console.log(this.courrier);
        
      },
      (error: any) => {
    });
  }
}

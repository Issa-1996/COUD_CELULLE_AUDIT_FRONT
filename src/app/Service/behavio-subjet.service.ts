import { Injectable } from '@angular/core';
import { UserModel } from 'app/Model/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehavioSubjetService {

  private routerInfo: BehaviorSubject<any>;
  constructor() { 
    this.routerInfo = new BehaviorSubject<any>([]);
  }
  getValue(): Observable<any> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue: any): void {
    this.routerInfo.next(newValue);
  }
}

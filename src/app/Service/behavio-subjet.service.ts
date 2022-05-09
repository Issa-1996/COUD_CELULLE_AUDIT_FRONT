import { Injectable } from '@angular/core';
import { UserModel } from 'app/Model/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehavioSubjetService {

  private routerInfo: BehaviorSubject<UserModel>;
  constructor() { 
    this.routerInfo = new BehaviorSubject<UserModel>(null);
  }
  getValue(): Observable<UserModel> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue: UserModel): void {
    this.routerInfo.next(newValue);
  }
}

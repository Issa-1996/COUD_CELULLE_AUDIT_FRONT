import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private StringSource= new BehaviorSubject('');
  currentSearch=this.StringSource.asObservable();
  constructor() { }
  changeValue(message: any){
    this.StringSource.next(message)
  }
}

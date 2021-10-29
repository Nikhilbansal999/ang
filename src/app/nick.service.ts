import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NickService {

  constructor() { }
 private source=new Subject<boolean>();
 msg = this.source.asObservable();
 value(x:boolean)
 {
   this.source.next(x);
 }
 
}

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  private source=new Subject<boolean>();
  msg = this.source.asObservable();
 dv(v:boolean)  {
 this.source.next(v);
 }

}

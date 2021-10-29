import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PickService {

  constructor() { }
  private source=new Subject<boolean>();
 msg = this.source.asObservable();
  value1(z:boolean)
  {
this.source.next(z)
  }

  saveToken(token:any)
  {
    return localStorage.setItem('token',token);
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  showToast(position: any = 'top-center') {
    alert('This is a toast.');
}
}

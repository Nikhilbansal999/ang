import { Component, OnInit } from '@angular/core';
import { NikhilService } from '../nikhil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private service :NikhilService,private route:Router) {
  if(!localStorage.getItem("token"))
  {
    alert("you are not authorised to this page");
    this.route.navigate(['/login'])
  }
  }
purchased:any=[];
  ngOnInit() {
    this.service.findPurchase(localStorage.getItem('email')).subscribe((res)=>{
      this.purchased=res;
      console.log(res);
    })
  }

}

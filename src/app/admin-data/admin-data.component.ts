import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NikhilService } from '../nikhil.service';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {

  constructor(private route:Router,private service:NikhilService) { 
    if(localStorage.getItem("email"))
    {
      this.route.navigate(['/admin']);
    }
    
  }
  userData:any;
  purchasedData:any;
  soldData:any;
  ngOnInit() {
    this.service.adminPurchase(localStorage.getItem("admail")).subscribe((res)=>{
      this.purchasedData=res;
      console.log(res);
    });
    this.service.fetchresel(localStorage.getItem("admail")).subscribe((res)=>{
    this.soldData=res;
      console.log(res);
    });
    this.service.findAllUser(localStorage.getItem("email")).subscribe((res)=>{
      this.userData=res;
      console.log(res);
    })
  }

}

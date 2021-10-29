import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NikhilService } from '../nikhil.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route:Router,private service:NikhilService) {
    if(localStorage.getItem('token'))
    {
    alert("You are not Authorised to access this page");
    
      this.route.navigate(['/home']);
    }
   }
admin:any;
  ngOnInit() {
    this.admin=new FormGroup({
      name:new FormControl(""),
      password:new FormControl("")
    });
    
  }
  get name(){
    return this.admin.get("name");
  }
  get password(){
    return this.admin.get("password");
  }
  count=0;
onAdmin(d1:any,d2:any)
{
 if(!localStorage.getItem("admail"))
{
  this.service.admin(d1.value,d2.value).subscribe((res)=>{
    console.log(res);
    localStorage.setItem("admail",d1.value);
  })

}else{
  this.service.findAdmin(d1.value,d2.value).subscribe((res)=>{
    // console.log(res);
  this.route.navigate(['/adminData']);
  },(err)=>{
    if(err.status==401)
    {
    // this.toastr.errorToastr("Invalid Email",'oops',{position:'top-center'});
   alert("invalid email")
    }else
    if(err.status==403){
    // this.toastr.errorToastr("Invalid password",'oops',{position:'top-center'});
   alert("invalid password")
    }
  })
}
}

}

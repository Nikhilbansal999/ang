import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import{NikhilService} from '../nikhil.service';
import { NickService } from '../nick.service';
import { ShareService } from '../share.service';
import { FlagService } from '../flag.service';
import { PickService } from '../pick.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router,private val:NickService,private service:NikhilService,private share:ShareService,private http:HttpClient, private s: FlagService,private local:PickService) { }
  loginForm:any;
    ngOnInit() {
      this.loginForm=new FormGroup({
        name:new FormControl('',Validators.required),
        password:new FormControl('',Validators.required)
      })

      if(localStorage.getItem('email')==null||localStorage.getItem('email')==undefined)
      {
        console.log("logged in...")
      }
      else
      {
       alert("you cant add item in  negative quantity");
        this.route.navigate(['/home'])
        this.share.dv(true)
      }




    }
    get name()  {  return this.loginForm.get('name');}
    get password(){ return this.loginForm.get('password'); }

    onLogin(name:any,password:any)
    {
      if(name.value==" "||name.value==""||password.value==""||password.value==" ")
      {
       alert("Please fill all the credentials");
      }
      else
      {
      this.service.login(name.value,password.value).subscribe((res:any)=>{
        console.log(res);
        if(res['token'])
          {
        this.local.saveToken(res['token']);
        localStorage.setItem('email',name.value);
        this.val.value(true);
        this.route.navigate(['/home']);
          }
       this.local.saveToken(res['token']);
       console.log(res['token']);
      },(err)=>{
        console.log(err);
        if(err.status==401)
  {
   alert("Invalid Password");
  }else if(err.status==406){
   alert("Unauthorised access");  }
  });
      }

    }

    signUp()  {  this.route.navigate(['/signup']);}

}

import { Component, OnInit } from '@angular/core';
import { NikhilService } from '../nikhil.service';
import { ReselitemshowinhomeService } from '../reselitemshowinhome.service';
import {Router} from '@angular/router'
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private route:Router,private service:NikhilService,private reselItem:ReselitemshowinhomeService) {
 
    if(!localStorage.getItem('token'))
    {
      this.route.navigate(['/login']);
    }
  //  if(this.reselItem.buyItem==null)
  //  {
  //    this.route.navigate(['/cart']);
  //  }
   }
userDetailing:any={};
reselData:any=[];
ad:any=[];

  form:any;
purchased:any=[];
finalData:any=[];
  ngOnInit() {
    
    this.form=new FormGroup({
      name:new FormControl('',[Validators.required]),
    contact:new FormControl("",[Validators.required])
      }); 
    
    this.service.dataFind(localStorage.getItem('token')).subscribe((res)=>{
this.userDetailing=res;
// console.log(this.userDetailing['email']);
      console.log(res);
      this.service.reselData(this.userDetailing['email']).subscribe((res)=>{
        console.log(res);
        this.reselData=res;
        console.log(this.reselData)
        this.reselItem.data=this.reselData;
        console.log(localStorage.getItem('email'));
for(var i=0;i<this.reselData.length;i++)
{
  this.finalData.push({
    'title':this.reselData[i].title,
    'price':this.reselData[i].price,
    'category':this.reselData[i].category,
    'id':this.reselData[i]._id,
  })
}
console.log(this.finalData);
        });

    });
    this.service.findAddress(localStorage.getItem('email')).subscribe((res)=>{
      this.ad=res;
      console.log(res);
    });
  // this.service.findPurchase(localStorage.getItem('email')).subscribe((res)=>{
  //   this.purchased=res;
  //   console.log(res);
  // })
  }

 
  
    get name()
    {  return this.form.get('name'); }
  
    get contact()
    { return this.form.get('contact'); }
    
    on(d1:any,d2:any){
      if(d1.value==""||d1.value==" "||d2.value==""||d2.value==" ")
      {
        alert("please fill all the credentials");
      }else{
      console.log(d1.value);
      console.log(d2.value)
      let l=localStorage.getItem("email");
      this.service.updateDetail(d1.value,d2.value,l).subscribe((res)=>{
        console.log(res);
        this.userDetailing=res;
      });
        }
      }
        deleting(data:any)
        {
      
          this.service.deleteSold(data.id).subscribe((res)=>{
            console.log(res);
            this.route.navigate(['/home'])
          })
        }
}

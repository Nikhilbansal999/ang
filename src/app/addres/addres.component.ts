import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { NikhilService } from '../nikhil.service';
import { Router } from '@angular/router';
import { ReselitemshowinhomeService } from '../reselitemshowinhome.service';
import { PickService } from '../pick.service';

@Component({
  selector: 'app-addres',
  templateUrl: './addres.component.html',
  styleUrls: ['./addres.component.css']
})
export class AddresComponent implements OnInit {

  constructor(private service:NikhilService,private route:Router,private reselling:ReselitemshowinhomeService,private pick:PickService) {
   }
   p:any=[];
  form:any;
  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl('',[Validators.required]),//nameValidator(/nikhil/)]),
    address:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    pincode:new FormControl("",[Validators.required]),
      }); 
    
  }
 buy:any=[];

 z:any;
  get name()
  {  return this.form.get('name'); }

  get address()
  { return this.form.get('address'); }
  get city()
  {
    return this.form.get('city');
  }
  get state()
  { return this.form.get('state'); }
  get pincode()
  {
    return this.form.get('pincode');
  }
  on(d1:any,d2:any,d3:any,d4:any,d5:any){
    if(d1.value==""||d1.value==" "||d2.value==""||d2.value==" "||d3.value==""||d3.value==" "||d3.value==""||d3.value==" "||d4.value==""||d4.value==" ")
    {
// this.pick.showToast();
// this.toastr.errorToastr("Please fill all the credentials",'Warning',{position:'top-center'});
alert("PLease fill all credentials");
    }
    else{
    this.service.address(d1.value,d2.value,d3.value,d4.value,d5.value,localStorage.getItem('email')).subscribe((res)=>{
      console.log(res);
    });
    // this.toastr.errorToastr("Your order will delivered 3-4 days",'Thank You',{position:'top-center'});
  alert("You order will be delivered");
    this.service.findCartItem(localStorage.getItem('email')).subscribe((res:any)=>{
  
      console.log(res[0]);
      // this.reselling.buyItem=res;
    this.p=res;
// console.log(this.p['price']);
for(var i=0;i<this.p.length;i++)
{
  this.buy.push({
    'item':this.p[i].item,
    'price':this.p[i].price,
    'counter':this.p[i].counter,
    'email':this.p[i].email,
    'category':this.p[i].category,
    'id':this.p[i].id
  })
}
console.log(this.buy);
      this.service.getPurchasedItem(this.buy).subscribe((res)=>{
        console.log(res);
      })
    });

    this.route.navigate(['/home']);
}
  }
}

import { Component, OnInit,DoCheck } from '@angular/core';
import {Router} from '@angular/router';
import { ReselitemshowinhomeService } from '../reselitemshowinhome.service';
import { NikhilService } from '../nikhil.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,DoCheck {

  constructor(private service:NikhilService,private route:Router,private reselling:ReselitemshowinhomeService) {
    if(!localStorage.getItem('token'))
    {
      this.route.navigate(['/login']);
    }
   }
 
   cartItem:any=[];
   datatoHome:any;


sum:any=0
value:any;
finalprice:any;
ngDoCheck(){
}
    ngOnInit() {
      
this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
 this.cartItem=res;
  console.log(res);
// console.log(res[0].price)
this.sum=0;
for(var i=0;i<this.cartItem.length;i++)
{
  console.log(this.cartItem[i].price);
  console.log(this.cartItem[i].counter)
this.sum+=this.cartItem[i].price*this.cartItem[i].counter;
this.service.total(localStorage.getItem('email'),this.sum).subscribe((res)=>{
  console.log(res)
})
}

});
console.log(this.sum);

  }
aray:any=[];
  counting(data:any){
    console.log(data);
    data.counter++;
let a=data.price;
let b=data.item;
let c=data.counter;
let d=data.category;
let total:any=a*c;
console.log(total)
localStorage.setItem("total",total);
this.sum=localStorage.getItem('total');
let f=localStorage.getItem('email');
    this.service.cartItem(a,b,c,d,data.id,f,total).subscribe((res)=>
    console.log(res));

  }
  revCounting(data1:any)
  {
   
if(data1.counter!=0)
{    data1.counter--;
let a=data1.price;
let b=data1.item;
let c=data1.counter;
let d=data1.category;
let total:any=a*c

localStorage.setItem("total",total);
this.sum=localStorage.getItem('total');
let f=localStorage.getItem('email');
    this.service.cartItem(a,b,c,d,data1.id,f,total).subscribe((res)=>console.log(res));
  // console.log(data1);
  }
  else{
    
    alert("you cant add item in  negative number"); 
}
}
deleteItem(data1:any){
  
   this.service.deleteCartItem(data1.id).subscribe((res)=>{
    this.cartItem=[];
    this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
      this.cartItem=res;
       console.log(res);
     });
      });
}

Go()
{
  this.route.navigate(['/address']);
}
}

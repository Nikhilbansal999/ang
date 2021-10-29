import { Component, OnInit } from '@angular/core';
import { NikhilService } from '../nikhil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
loading=true
  constructor(private service:NikhilService,private route:Router) {
    // if(!localStorage.getItem('token'))
    // {
    //   this.route.navigate(['/login']);
    // }else{
      this.cart1();
      this.loading=false;
      this.service.getMobile("mobile").subscribe((res)=>{
              this.mobileData=res;
        // console.log(this.mobileData);
        // this.image=res['buffer'];
        
        for(var i=0;i<this.mobileData.length;i++)
        {
          // console.log(this.mobileData[i]);
          this.p=this.mobileData[i].ext;
          let title=this.mobileData[i].title;
          let price=this.mobileData[i].price;
          let id=this.mobileData[i]._id;
          let category=this.mobileData[i].category;
          let image=this.mobileData[i].imageName;
          console.log()
          this.service.getImage(this.mobileData[i].imageName,this.mobileData[i].ext).subscribe((res)=>{
            this.gif=res;
            // console.log(this.gif);
            // console.log('data:image/'+this.p+';base64,'+this.gif.buffer.image);
            this.image_data_final.push('data:image/'+this.p+';base64,'+this.gif.buffer.image);
            let ct=0;
            for(let j=0;j<this.cart.length;j++){
              if(this.cart[j].id==id){
                this.finalData.push({
                  'item':title,
                  'price':price,
                  'category':category,
                  'id':id,
                  'image':'data:image/'+this.p+';base64,'+this.gif.buffer.image,
                  'counter':this.cart[j].counter
                });
                ct=1;
                break;
              }
            
            }
            if(ct==0){
              this.finalData.push({
                'item':title,
                'price':price,
                'category':category,
                'id':id,
                'image':'data:image/'+this.p+';base64,'+this.gif.buffer.image,
                'counter':0
              });
            }
              
          });
        }
        console.log(this.mobileData);
        console.log(this.image_data_final);
        console.log(this.finalData);
        // this.attach();
      });
        
    // }
   }
  
mobileData:any;
finalData:any=[];
cart:any;
gif:any=[];
image_data_final:any=[];
p:any;

  ngOnInit() {
//     this.service.getMobile("mobile").subscribe((res)=>{
//       this.mobileData=res;
//       console.log(res);
  

// this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
//   this.cart=res;
//   console.log(res);
//   let ct=0;
//   for(let i=0;i<this.mobileData.length;i++)
//     {
//       for(let j=0;j<this.cart.length;j++)
//       { 
//         if(this.cart[j].id==this.mobileData[i]._id){
//       this.finalData.push({
//         'item':this.mobileData[i].title,
//         'price':this.mobileData[i].price,
//         'category':this.mobileData[i].category,
//         'image':this.mobileData[i].imageName,
//         'id':this.mobileData[i]._id,
//         'counter':this.cart[j].counter
//       })
//       ct=1;
//       break;
//     }
//   }
//   if(ct==0){
//     this.finalData.push({
//       'item':this.mobileData[i].title,
//       'price':this.mobileData[i].price,
//       'category':this.mobileData[i].category,
//       'image':this.mobileData[i].imageUrl,
//       'id':this.mobileData[i]._id,
//       'counter':0
  
//     });
//   }else{
//     ct=0;
//   }
//     }
// });
// console.log(this.finalData);   
//     });
  }

  cart1(){
    this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
          this.cart=res;
          console.log(res);
          let ct=0;
          
    });
      
     
  }

  counting(data:any)
  {
    if(!localStorage.getItem('token'))
    {
      this.route.navigate(['/login']);
  alert("please login first ");
      
    }else{
console.log(data);
data.counter++;
let a=data.price;
let b=data.item;
let c=data.counter;
let d=data.category;
let total=a*c;

let f=localStorage.getItem('email');
    this.service.cartItem(a,b,c,d,data.id,f,total).subscribe((res)=>console.log(res));
    alert("Product added into cart");

  }
}
  revCounting(data1:any)
  {
   
if(data1.counter!=0)
{    data1.counter--;
  let a=data1.price;
let b=data1.item;
let c=data1.counter;
let d=data1.category;
let total=a*c;

let f=localStorage.getItem('email');
    this.service.cartItem(a,b,c,d,data1.id,f,total).subscribe((res)=>console.log(res));
  // console.log(data1);
  }
  else{
    
    alert("you cant add item in  negative quantity");
}
if(data1.counter<1)
    {
     this.service.deleteCartItem(data1.id).subscribe((res)=>{
       console.log(res);
        });
  }
}
}

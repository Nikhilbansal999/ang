import { Component, OnInit } from '@angular/core';
import {NikhilService} from '../nikhil.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.css']
})
export class DroneComponent implements OnInit {
loading:any=true;
  constructor(private service:NikhilService,private route:Router) {
    // this.service.a=10
    // console.log(this.service.a)
    // if(!localStorage.getItem('token'))
    // {
    //   this.route.navigate(['/login']);
    // }else{
      this.cart1();
      this.service.getdrone("drone").subscribe((res)=>{
    this.loading=false
        this.droneData=res;
        // console.log(this.droneData);
        // this.image=res['buffer'];
        
        for(var i=0;i<this.droneData.length;i++)
        {
          // console.log(this.droneData[i]);
          this.p=this.droneData[i].ext;
          let title=this.droneData[i].title;
          let price=this.droneData[i].price;
          let id=this.droneData[i]._id;
          let category=this.droneData[i].category;
          let image=this.droneData[i].imageName;
          console.log()
          this.service.getImage(this.droneData[i].imageName,this.droneData[i].ext).subscribe((res)=>{
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
        console.log(this.droneData);
        console.log(this.image_data_final);
        console.log(this.finalData);
        // this.attach();
      });
        
    // }
   }
  // droneData;
  //   ngOnInit() {
  //     this.service.getdrone("drone").subscribe((res)=>{
  //       this.droneData=res;
  //       console.log(res);
  //     })
  //   }
  droneData:any;
  cart:any;
  gif:any=[];
  image_data_final:any=[];
  p:any;
  finalData:any=[];
  cart1(){
    this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
          this.cart=res;
          console.log(res);
          let ct=0;
          
    });
      
     
  }
  ngOnInit() {
   
//     this.service.getdrone("drone").subscribe((res)=>{
//       this.droneData=res;
//       console.log(res);
  

// this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
//   this.cart=res;
//   console.log(res);
//   let ct=0;
//   for(let i=0;i<this.droneData.length;i++)
//     {
//       for(let j=0;j<this.cart.length;j++)
//       { 
//         if(this.cart[j].id==this.droneData[i]._id){
//       this.finalData.push({
//         'item':this.droneData[i].title,
//         'price':this.droneData[i].price,
//         'category':this.droneData[i].category,
//         'image':this.droneData[i].imageName,
//         'id':this.droneData[i]._id,
//         'counter':this.cart[j].counter
//       })
//       ct=1;
//       break;
//     }
//   }
//   if(ct==0){
//     this.finalData.push({
//       'item':this.droneData[i].title,
//       'price':this.droneData[i].price,
//       'category':this.droneData[i].category,
//       'image':this.droneData[i].imageUrl,
//       'id':this.droneData[i]._id,
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


  counting(data:any)
{
  if(!localStorage.getItem('token'))
  {
    this.route.navigate(['/login']);
  // this.toastr.errorToastr("please login first ",'Warning ',{position:'top-center'});
  alert("Please login first");
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
  // this.toastr.errorToastr("you cant add item in  negative quantity",'oops',{position:'top-center'});
  alert("you cant add item in  negative quantity")
}
if(data1.counter<1)
  {
   this.service.deleteCartItem(data1.id).subscribe((res)=>{
     console.log(res);
      });
}
}
}

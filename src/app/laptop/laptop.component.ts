import { Component, OnInit } from '@angular/core';
import{NikhilService} from '../nikhil.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
loading=true;
  constructor(private service:NikhilService,private route:Router) {
    // if(!localStorage.getItem('token'))
    // {
    //   this.route.navigate(['/login']);
    // }else{
      this.cart1();
      this.loading=false;
      this.service.getlaptop("laptop").subscribe((res)=>{
      
        this.laptopData=res;
        // console.log(this.laptopData);
        // this.image=res['buffer'];
        
        for(var i=0;i<this.laptopData.length;i++)
        {
          // console.log(this.laptopData[i]);
          this.p=this.laptopData[i].ext;
          let title=this.laptopData[i].title;
          let price=this.laptopData[i].price;
          let id=this.laptopData[i]._id;
          let category=this.laptopData[i].category;
          let image=this.laptopData[i].imageName;
          console.log()
          this.service.getImage(this.laptopData[i].imageName,this.laptopData[i].ext).subscribe((res)=>{
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
        console.log(this.laptopData);
        console.log(this.image_data_final);
        console.log(this.finalData);
        // this.attach();
      });
        
    // }
   }
  laptopData:any;
  cart:any;
  finalData:any=[];
p:any;
image_data_final:any=[];
gif:any=[];


    ngOnInit() {
   
  //     this.service.getlaptop("laptop").subscribe((res)=>{
  //       this.laptopData=res;
  //       console.log(res);
    
  
  // this.service.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
  //   this.cart=res;
  //   console.log(res);
  //   let ct=0;
  //   for(let i=0;i<this.laptopData.length;i++)
  //     {
  //       for(let j=0;j<this.cart.length;j++)
  //       { 
  //         if(this.cart[j].id==this.laptopData[i]._id){
  //       this.finalData.push({
  //         'item':this.laptopData[i].title,
  //         'price':this.laptopData[i].price,
  //         'category':this.laptopData[i].category,
  //         'image':this.laptopData[i].imageName,
  //         'id':this.laptopData[i]._id,
  //         'counter':this.cart[j].counter
  //       })
  //       ct=1;
  //       break;
  //     }
  //   }
  //   if(ct==0){
  //     this.finalData.push({
  //       'item':this.laptopData[i].title,
  //       'price':this.laptopData[i].price,
  //       'category':this.laptopData[i].category,
  //       'image':this.laptopData[i].imageUrl,
  //       'id':this.laptopData[i]._id,
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
  // this.toastr.errorToastr("please login first ",'Warning ',{position:'top-center'});
  alert("please login frst")

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
  }
alert("product added into cart")

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
    alert("you can't add item in negative quantity")
}
if(data1.counter<1)
    {
     this.service.deleteCartItem(data1.id).subscribe((res)=>{
       console.log(res);
        });
  }
}
  }
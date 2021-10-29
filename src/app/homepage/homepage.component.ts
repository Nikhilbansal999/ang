import { Component, OnInit } from '@angular/core';
import {NikhilService} from '../nikhil.service';
import { Router} from '@angular/router';
import { NickService } from '../nick.service';
import { ShareService } from '../share.service';
import { ReselitemshowinhomeService } from '../reselitemshowinhome.service';
import { PickService } from '../pick.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loading=true;
  constructor(private route:Router,private nikhil:NikhilService,private service:NickService,private pick:PickService,private  share:ShareService,private reselling:ReselitemshowinhomeService) { 
    // this.nikhil.a=5;
    // if(!localStorage.getItem('token'))
    // {
    //   this.route.navigate(['/login']);
    // }else{
      this.cart1();
      this.nikhil.fetchresel(localStorage.getItem('email')).subscribe((res)=>{
      this.loading=false;
        this.reselData=res;
        // console.log(this.reselData);
        // this.image=res['buffer'];
        
        for(var i=0;i<this.reselData.length;i++)
        {
          // console.log(this.reselData[i]);
          this.p=this.reselData[i].ext;
          let title=this.reselData[i].title;
          let price=this.reselData[i].price;
          let id=this.reselData[i]._id;
          let category=this.reselData[i].category;
          let image=this.reselData[i].imageName;
          console.log()
          this.nikhil.getImage(this.reselData[i].imageName,this.reselData[i].ext).subscribe((res)=>{
            this.gif=res;
            // console.log(this.gif);
            // console.log('data:image/'+this.p+';base64,'+this.gif.buffer.image);
            this.image_data_final.push('data:image/'+this.p+';base64,'+this.gif.buffer.image);
            let ct=0;
            for(let j=0;j<this.cart.length;j++){
              if(this.cart[j].id==id){
                this.finalData.push({               'item':title,
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
        console.log(this.reselData);
        console.log(this.image_data_final);
        console.log(this.finalData);
        // this.attach();
      });
        
    // }
  }

  cart1(){
    this.nikhil.findCartItem(localStorage.getItem('email')).subscribe((res)=>{
          this.cart=res;
          console.log(res);
          let ct=0;
          
    });
      
     
  }

  reseldata:any;
  x:any;
  d:any;
  reselData:any;
  CData={};
finalData:any=[];
image:any=[];
counter=0;
cart:any=[];
photo:any;
p:any;
g:any;
img:any=[];
real:any=[];
gif:any=[];
image_data_final:any=[];
  ngOnInit() {
   
  }

  i=0;
  j=0;
  k=0;


  counting(data:any){
      if(!localStorage.getItem('token'))
    {
      this.route.navigate(['/login']);
  // this.toastr.errorToastr("please login first ",'Warning ',{position:'top-center'});
  alert("please login first")

    }else{
    console.log(data);
    data.counter++;
let a=data.price;
let b=data.item;
let c=data.counter;
let d=data.category;
let total=a*c;

let f=localStorage.getItem('email');
    this.nikhil.cartItem(a,b,c,d,data.id,f,total).subscribe((res)=>console.log(res));
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
    this.nikhil.cartItem(a,b,c,d,data1.id,f,total).subscribe((res)=>console.log(res));
  // console.log(data1);
  }
  else{
    
    // alert("you cant add item in  negative number"); 
    // this.toastr.errorToastr("you cant add item in  negative quantity",'oops',{position:'top-center'});
    alert("you can't add item in negative quantity");
    // this.pick.showToast()
}
if(data1.counter<1)
    {
     this.nikhil.deleteCartItem(data1.id).subscribe((res)=>{
       console.log(res);
        });
  }
}
}

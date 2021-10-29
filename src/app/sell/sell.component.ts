import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { NikhilService } from '../nikhil.service';
import { ReselitemshowinhomeService } from '../reselitemshowinhome.service';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
 
  constructor(private service:NikhilService,public reselling:ReselitemshowinhomeService,private route:Router) {
  
    if(!localStorage.getItem('token'))
    {
      this.route.navigate(['/login']);
    }
   }
  
  url:any;
  photo:any;
  image:any;
  readUrl(event:any) {
    if (event.target.files ) {
      var file=event.target.files[0];  
      var reader = new FileReader();

        reader.onload = (event:any) => {
          this.photo=reader.result;
          this.reselling.image=this.photo
            this.url = event.target.result;
            // console.log(this.photo);
        }

        reader.readAsDataURL(event.target.files[0]);
    }
}
    slashIndex:any;
    semiColonIndex:any;
    commaIndex:any;
    imageurl:any;
    ext:any;

x:any;

form:any;
ngOnInit()
{
  this.form=new FormGroup({
    name:new FormControl('',[Validators.required]),//nameValidator(/nikhil/)]),
  price:new FormControl("",[Validators.required]),
  password:new FormControl("",Validators.required),
  password1:new FormControl("",Validators.required),
  mobile:new FormControl("",[Validators.required])
    }); 
}
  get name()
  {  return this.form.get('name'); }
  get username()
  { return this.form.get('username');  }
  get price() 
  { return this.form.get('price');  }
  get password()
  { return this.form.get('password'); }
  get password1()
  { return this.form.get('password1');  }
  get mobile()
  { return this.form.get('mobile'); }
detail:any;
increase=0;
ctr=0;
sellingDetails:any=[];

  on(d1:any,d2:any,d3:any)
  {
    
    if(d1.value==""||d1.value==" "||d2.value==""||d2.value==" "||d3.value==""||d3.value==" ")
    {
      // this.toastr.errorToastr("Please fill all the credentials",'Warning',{position:'top-center'});
      alert("please fill all credentials")
    }
    else{
      this.image=this.reselling.image;
      for(var x=0;x<this.image.length;x++)
      {
       if(this.image[x]=="/") { this.slashIndex=x;}  
       if(this.image[x]==";"){this.semiColonIndex=x;}
        if(this.image[x]==","){this.commaIndex=x;break;}
      }
      
      this.imageurl=this.image.slice(this.commaIndex);
      this.ext=this.image.substring(this.slashIndex+1,this.semiColonIndex);
      let name="product_image"+this.ctr;
      console.log(name);
      this.ctr++;

this.detail=localStorage.getItem("email");
      this.service.reselItem(d1.value,d2.value,d3.value,this.detail,this.increase,this.imageurl,this.ext,name).subscribe((res=>{
        this.sellingDetails=res;

        
        console.log(this.sellingDetails._id);
        localStorage.setItem('title',d1.value);
localStorage.setItem('price',d2.value);
        this.reselling.d1=this.sellingDetails;
        console.log(res);
        console.log(this.sellingDetails);
        this.route.navigate(['/home']);
      }))
    }
  }
}

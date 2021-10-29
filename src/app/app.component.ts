import { Component, OnInit, DoCheck } from '@angular/core';
import { NickService } from './nick.service';
import { Router } from '@angular/router';
import { PickService } from './pick.service';
import { ShareService } from './share.service';
import { FlagService } from './flag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'resel';
  constructor(private serve:ShareService ,private data:NickService,private route:Router,private cont:PickService, private service: FlagService){}
  //  ngDoCheck(){

//     if(localStorage.getItem('email')){
// alert('login');
//     }else{
// alert('not login');
//     }
  //  console.log(localStorage.getItem('email'););
//  }
y:any;
z:any;
  ngDoCheck() {
    if(!this.service.x)
    {
      if(localStorage.getItem('email'))
      {this.y = true;
      this.z=true;}
      else
      {this.y = false;
      this.z=false;}
      this.service.x=false;
    }
  }

  ngOnInit(){
/* 
    if(this.x){
      this.y=true;

    }else{
    this.y =false;
    } */

  
/* this.data.msg.subscribe((r)=>{
  this.x = r;

  this.cont.msg.subscribe((pr)=>{
    this.x=pr;

    this.serve.msg.subscribe((er)=>{this.x=er})
  })
}) */
  }
  
  delete()
  {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.service.x = false;
    this.route.navigate(['/login']);
    this.cont.value1(false);
  }
  Go()
{
  this.route.navigate(['/mobile']);
}
laptop()
{
  this.route.navigate(['/laptop']);
}
drone()
{
  this.route.navigate(['/drone']);
}action()
{
  this.route.navigate(['/action']);
}
dslr()
{
  this.route.navigate(['/dslr']);
}tv()
{
  this.route.navigate(['/tv']);
}
accessories()
{
  this.route.navigate(['/accessories']);
}
about()
{
  this.route.navigate(['/about']);
}
customer()
{
  this.route.navigate(['/customer']);
}
rate()
{
  this.route.navigate(['/rate']);
}
home(){
  this.route.navigate(['/home'])
}
cart(){
  this.route.navigate(['/cart'])
}
}

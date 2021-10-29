import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { SellComponent } from './sell/sell.component';
import{AccountComponent} from  './account/account.component';
import {CartComponent} from './cart/cart.component';
import { AddresComponent } from './addres/addres.component';
import { AdminComponent} from './admin/admin.component';
import { MobileComponent } from './mobile/mobile.component';
import { LaptopComponent } from './laptop/laptop.component';
import { DroneComponent } from './drone/drone.component';
import { ActionComponent } from './action/action.component';
import { DslrComponent } from './dslr/dslr.component';
import { TvComponent } from './tv/tv.component';
import { AccessriesComponent } from './accessries/accessries.component';
import { AboutComponent } from './about/about.component';
import {OrdersComponent} from './orders/orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TestingComponent } from './testing/testing.component';
import { AdminDataComponent } from './admin-data/admin-data.component';
const routes: Routes = [
  {path:"order",component:OrdersComponent},
  {path:"admin",component:AdminComponent},
  {path:"laptop",component:LaptopComponent},
  {path:"drone",component:DroneComponent},
  {path:"action",component:ActionComponent},
  {path:"dslr",component:DslrComponent},
  {path:"tv",component:TvComponent},
  {path:"accessories",component:AccessriesComponent},
  {path:"mobile",component:MobileComponent},
  {path:"about",component:AboutComponent},
 {path:"adminData",component:AdminDataComponent},
  { path:"address",component:AddresComponent}, 
  { path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
   { path:'sellit',component:SellComponent },
  { path:'signup',component:SignupComponent },
  {path:'cart',component:CartComponent,children :[
    {path:"address",component:AddresComponent}
  ]},
  {path:'account',component:AccountComponent},
  { path:'home',component:HomepageComponent},
  { path:'',component:HomepageComponent },
  { path:'testing',component:TestingComponent },
  { path:'**',component:HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

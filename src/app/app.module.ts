import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from "ngx-highlightjs";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NikhilService} from './nikhil.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SellComponent } from './sell/sell.component';
import { ChangeDirective } from './change.directive';
import {HttpClientModule} from '@angular/common/http';
import { CustomDirective } from './custom.directive';
import { AccountComponent } from './account/account.component';
import { NickService } from './nick.service';
import { PickService } from './pick.service';
import { ReselitemshowinhomeService } from './reselitemshowinhome.service';
import { CartComponent } from './cart/cart.component';
import { AddresComponent } from './addres/addres.component';
import { MobileComponent } from './mobile/mobile.component';
import { LaptopComponent } from './laptop/laptop.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { DroneComponent } from './drone/drone.component';
import { ActionComponent } from './action/action.component';
import { DslrComponent } from './dslr/dslr.component';
import { AccessriesComponent } from './accessries/accessries.component';
import { TvComponent } from './tv/tv.component';
import { AboutComponent } from './about/about.component';
import { OrdersComponent } from './orders/orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TestingComponent } from './testing/testing.component';
@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    SellComponent,
    ChangeDirective,
    CustomDirective,
    AccountComponent,
    CartComponent,
    AddresComponent,
    MobileComponent,
    LaptopComponent,
    AdminComponent,
    AdminDataComponent,
    DroneComponent,
    ActionComponent,
    DslrComponent,
    AccessriesComponent,
    TvComponent,
    AboutComponent,
    OrdersComponent,
    HomepageComponent,
    LandingpageComponent,
    TestingComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,  HighlightModule,
    BrowserModule,
    ReactiveFormsModule
    ,AppRoutingModule,
    HttpClientModule, 
     BrowserAnimationsModule,
  ],
  providers: [NikhilService, {
    provide: HIGHLIGHT_OPTIONS,
    
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
    }
  }    ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }

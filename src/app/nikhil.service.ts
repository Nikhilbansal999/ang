import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NikhilService {

  constructor(private http:HttpClient) { }


reg(d1:any,d2:any,d3:any,d4:any,d5:any)
{
console.log(d1,d2,d3,d4,d5);
return this.http.post("http://localhost:3000/reg",{"name":d1,"email":d2,"password":d3,"password1":d4,"contact":d5});
}

login(name:any,password:any)
{
  return this.http.post("http://localhost:3000/login",{'name':name,"password":password});
}
find(d1:any)
{
  return this.http.post("http://localhost:3000/find",{'name':d1});
}
//used to find data according to the user
dataFind(d1:any)
{
  return this.http.post("http://localhost:3000/data",{'token':d1});
}
// resellItem(d1,d2,d3)
// {
//   return this.http.post("http://localhost:3000/sellingData",{"title":d1,"price":d2,"category":d3});

// }


reselItem(d1:any,d2:any,d3:any,d4:any,d5:any,d6:any,d7:any,d8:any)
{
  return this.http.post("http://localhost:3000/sellData",{'title':d1,'price':d2,"category":d3,'pehchan':d4,"plusminus":d5,"imageUrl":d6,"ext":d7,"name":d8})
}
//to find the reselling data  that placed yet
reselData(d2:any)
{
  return this.http.post("http://localhost:3000/findresel",{'pehchan':d2});
}

//this is used to show
fetchresel(d2:any)
{
  // let params:HttpParams=new HttpParams().set("pehchan",localStorage.getItem('email'));
    return this.http.post("http://localhost:3000/showReselData",{"pehchan":d2});
}
updateDetail(d1:any,d2:any,d3:any)
{
  return this.http.post('http://localhost:3000/update_profile',{'name':d1,"contact":d2,'email':d3});
}
//to save the item that is to be carted
cartItem(d1:any,d2:any,d3:any,d4:any,d5:any,d6:any,d7:any)
{
  return this.http.post('http://localhost:3000/cart',{"price":d1,"item":d2,"counter":d3,"category":d4,"id":d5,"email":d6,"total":d7})
}
//retrive the cart item according to user
findCartItem(d1:any)
{
  return this.http.post('http://localhost:3000/findCart',{"email":d1})
}
//delete the cartitem through homecomponent

deleteCartItem(d2:any)
{
  return this.http.post('http://localhost:3000/deleteCart',{"id":d2})
}
//adding the address
address(d1:any,d2:any,d3:any,d4:any,d5:any,d6:any)
{
 return this.http.post('http://localhost:3000/address',{"name":d1,"address":d2,"city":d3,"state":d4,"pincode":d5,"email":d6})
}
findAddress(d:any)
{
return this.http.post('http://localhost:3000/findAddressAccToUser',{'email':d});
}
getPurchasedItem(d:any)
{
return this.http.post('http://localhost:3000/purchasedProduct',d);
}
findPurchase(d:any)
{
  return this.http.post('http://localhost:3000/findPurchased',{"email":d});
}

admin(d1:any,d2:any)
{
  return this.http.post("http://localhost:3000/admin",{"email":d1,"password":d2});
}
findAdmin(d:any,d1:any)
{
  return this.http.post("http://localhost:3000/adminFind",{"email":d,"password":d1});
}
adminPurchase(d:any)
{
return this.http.post("http://localhost:3000/findPurchase",{"email":d});
}

getMobile(d1:any)
{
  return this.http.post("http://localhost:3000/mobile",{"category":d1});
}
getlaptop(d1:any)
{
  return this.http.post("http://localhost:3000/laptop",{"category":d1});
}getdrone(d1:any)
{
  return this.http.post("http://localhost:3000/drone",{"category":d1});
}getaction(d1:any)
{
  return this.http.post("http://localhost:3000/action",{"category":d1});
}getdslr(d1:any)
{
  return this.http.post("http://localhost:3000/dslr",{"category":d1});
}
gettv(d1:any)
{
  return this.http.post("http://localhost:3000/tv",{"category":d1});
}
getaccessories(d1:any)
{
  return this.http.post("http://localhost:3000/accessories",{"category":d1});
}
deleteSold(d1:any)
{
  return this.http.post("http://localhost:3000/deleteSold",{"id":d1});
}

findAllUser(d:any)
{
  return this.http.post("http://localhost:3000/findAll",{"email":d});
}


getImage(d1:any,d2:any)
{
  return this.http.post("http://localhost:3000/img",{"imageName":d1,"ext":d2});
}
total(d1:any,d2:any){
  return this.http.post("http://localhost:3000/total",{"email":d1,"sum":d2})
}
// a:any=6;
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  userTokenHeaders:any={token:localStorage.getItem("userToken")||''};

  constructor(private _HttpClient:HttpClient) { }
  reqOrderAPI(cId:string ,formData:any):Observable<any>{
return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/checkout-session/${cId}?url=${Environment.webURL}`,
  {shippingAddress :formData},
  {headers:this.userTokenHeaders},
)
  }

getAllOrders(id:string):Observable<any>{
return this._HttpClient.get(`${Environment.baseURL}/api/v1/orders/user/${id}`)
}


  
}
